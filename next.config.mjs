/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
