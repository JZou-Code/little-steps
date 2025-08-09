import { useEffect, useRef } from 'react';
import {getJwtExpMs} from "../utils/jwtUtils.js";

export default function useRefreshScheduler(accessToken, refresh) {
    const timerRef = useRef(null);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        try {
            const expiresAt = getJwtExpMs(accessToken);
            const now = Date.now();

            const refreshAt = expiresAt - now - 2 * 1000;

            if (refreshAt > 0) {
                timerRef.current = setTimeout(() => {
                    refresh();
                }, refreshAt);
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
