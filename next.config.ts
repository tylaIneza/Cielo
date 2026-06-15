import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    optimizeCss: true,
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Turbopack (default in Next.js 16) — canvas is excluded via alias since
  // all Three.js components use dynamic() with ssr:false
  turbopack: {
    resolveAlias: {
      canvas: { browser: "./src/lib/empty.js" },
    },
  },
};

export default nextConfig;
