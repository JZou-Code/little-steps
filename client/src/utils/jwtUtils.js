/**
 * Extracts expiration time from JWT token in milliseconds
 * Decodes JWT payload and returns expiration timestamp
 * 
 * @param {string} token - JWT token to decode
 * @returns {number|null} Expiration time in milliseconds or null if invalid
 */
export function getJwtExpMs(token) {
    try {
        if (!token) {
            return null;
        }
        const [header, payload, sign] = token.split('.');
        if (!payload) return null;
        const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        if (!json?.exp) {
            return null;
        }
        return json.exp * 1000;
    } catch {
        return null;
    }
}
