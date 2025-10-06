import {useEffect, useRef} from 'react';
import {getJwtExpMs} from "../utils/jwtUtils.js";

/**
 * Custom hook for scheduling automatic token refresh
 * Calculates refresh timing based on token expiration
 * Schedules refresh 1 minute before token expires
 * 
 * @param {string} accessToken - Current access token
 * @param {Function} refresh - Function to call for token refresh
 */
export default function useRefreshScheduler(accessToken, refresh) {
    const timerRef = useRef(null);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        try {
            const expiresAt = getJwtExpMs(accessToken);
            const now = Date.now();

            const refreshAt = expiresAt - now - 60 * 1000;

            if (refreshAt > 0) {
                timerRef.current = setTimeout(() => {
                    refresh();
                }, refreshAt);
            } else {
                refresh();
            }
        } catch (err) {
            console.error('Failed to schedule token refresh', err);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [accessToken, refresh]);
}
