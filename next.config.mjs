/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    VIETQR_CLIENT_ID: process.env.VIETQR_CLIENT_ID,
    VIETQR_API_KEY: process.env.VIETQR_API_KEY,
  },
};

export default nextConfig;
