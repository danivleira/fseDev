/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    subdomain: process.env.subdomain,
    email: process.env.email,
    password: process.env.password,
    api_token: process.env.api_token,
  },
  
};

export default nextConfig;
