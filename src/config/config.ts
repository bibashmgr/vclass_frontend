export const config = {
  CLIENT_BASE_URL: import.meta.env.DEV
    ? import.meta.env.VITE_LOCAL_CLIENT_BASE_URL
    : import.meta.env.VITE_LIVE_CLIENT_BASE_URL,
  SERVER_BASE_URL: import.meta.env.DEV
    ? import.meta.env.VITE_LOCAL_SERVER_BASE_URL
    : import.meta.env.VITE_LIVE_SERVER_BASE_URL,
};
