import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // BASE_URL_API:"http://116.193.190.82:8081/api",
    BASE_URL_API:"http://127.0.0.1:8000/api",
    SESSION_SECRET:"MxH6RZHTt646LThIKRN8asJu3NsjRxQJ7nV0FglP2H4=",
    FORECAST_API:"http://api.weatherstack.com",
    FORECAST_API_ACCESS_KEY:"65bff9dd612d282d77445b3aee733c44",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.worldweatheronline.com',
        port: '',
        pathname: '/image/**',
        search: '',
      },
    ],
  },
  // eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
