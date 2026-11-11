/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Uploaded photos are served from Vercel Blob's public domain —
    // this is required or next/image will refuse to optimize them.
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
