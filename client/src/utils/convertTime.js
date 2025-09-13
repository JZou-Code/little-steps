export const convertTime = (iso, opts = {}) => {
    return new Intl.DateTimeFormat('en-NZ', {
        timeZone: 'Pacific/Auckland',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
        hour12: false,
        ...opts,
    }).format(new Date(iso));
}
