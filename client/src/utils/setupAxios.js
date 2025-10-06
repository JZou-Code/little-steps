import axiosApi from "../api/axiosApi.js";
import {requestLogout, requestRefresh} from "../api/manageUsers.js";

/**
 * Flag to prevent multiple interceptor installations
 */
let installed = false;

/**
 * Sets up authentication interceptors for axios API calls
 * Handles automatic token refresh on 401 errors
 * Manages logout on authentication failures
 * 
 * @param {Object} params - Configuration parameters
 * @param {Function} params.logout - Logout function to call on auth failure
 */
export function setupAuthInterceptors({logout}) {
    if (installed) {
        return
    }
    installed = true;

    /**
     * Retries a failed request with a refreshed token
     * @param {Object} originalRequest - The original axios request configuration
     * @returns {Promise} Retry result or logout on failure
     */
    const retryWithToken = async (originalRequest) => {
        try {
            const newAT = await requestRefresh();
            if (!newAT) {
                logout();
                await requestLogout();
                return
            }

            originalRequest._retry = true;
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${newAT}`;
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${newAT}`;

            return axiosApi(originalRequest);
        } catch (err) {
            logout();
            await requestLogout();
            return Promise.reject(err);
        }
    };

    axiosApi.interceptors.response.use(
        async (resp) => {
            const biz = resp?.data?.code;
            if (biz === 401 || biz === '401') {
                const originalRequest = resp.config || {};
                if (originalRequest._retry || originalRequest.url?.includes('/refresh')) {
                    logout();
                    return Promise.reject(new Error('Session expired (biz code 401)'));
                }
                return retryWithToken(originalRequest);
            }
            return resp;
        },

        async (error) => {
            const status = error?.response?.status;
            const biz = error?.response?.data?.code;
            const originalRequest = error?.config || {};

            const is401 = status === 401 || biz === 401 || biz === '401';
            const isRefreshCall = originalRequest?.url?.includes('/refresh-token') ||
                originalRequest?.url?.includes('/refresh');

            if (is401 && !originalRequest._retry && !isRefreshCall) {
                return retryWithToken(originalRequest);
            }

            if (is401) {
                logout();
            }

            return Promise.reject(error);
        }
    );
}
