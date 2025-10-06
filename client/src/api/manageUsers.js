import axiosApi from "./axiosApi.js";

/**
 * API functions for user management operations
 * Handles user deletion, updates, authentication, and password changes
 */

/**
 * Deletes a user by ID
 * @param {string} id - User ID to delete
 * @returns {Promise} API response for user deletion
 */
export const deleteUserById = (id) => {
    return axiosApi.delete(
        `/user/delete-user/${id}`,
    )
}

/**
 * Updates user information by ID
 * @param {string} id - User ID to update
 * @param {Object} data - User data to update
 * @returns {Promise} API response for user update
 */
export const updateUserById = (id, data) => {
    return axiosApi.put(
        `/user/update-user`,
        {id, ...data}
    )
}

/**
 * Requests a new access token using refresh token
 * @returns {Promise} API response with new access token
 */
export const requestRefresh = () => {
    return axiosApi.post(
        '/user/refresh-token',
        {}
    )
}

/**
 * Logs out a user by ID
 * @param {string} id - User ID to logout
 * @returns {Promise} API response for logout
 */
export const requestLogout = (id) => {
    return axiosApi.post(
        '/user/logout',
        {
            id
        }
    )
}

/**
 * Changes user password
 * @param {Object} data - Password change data
 * @returns {Promise} API response for password change
 */
export const requestChangePassword = (data) => {
    return axiosApi.put(
        '/user/change-password',
        data
    )
}
