/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // IMPORTANT: Change this to your exact GitHub repository name
  basePath: '/virtuozzo-storage', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;