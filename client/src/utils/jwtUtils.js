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
