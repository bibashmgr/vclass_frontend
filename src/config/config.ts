export const config = {
    BASE_URL : import.meta.env.DEV ? import.meta.env.VITE_LOCAL_SERVER_BASE_URL : import.meta.env.VITE_LIVE_SERVER_BASE_URL,
};