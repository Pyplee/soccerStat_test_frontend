/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/competitions',
        permanent: false,
      },
    ];
  },
};


export default nextConfig;
