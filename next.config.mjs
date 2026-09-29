/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pure static HTML/CSS/JS export — no Node server needed (Hostinger shared hosting)
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Static hosting has no image optimiser; images are served as-is from /assets/images
    unoptimized: true,
  },
};

export default nextConfig;
