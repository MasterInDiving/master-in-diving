import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root; otherwise a stray lockfile above the project
  // makes Turbopack walk up into the home directory.
  turbopack: { root: path.resolve() },
  // Photos are pre-optimized at build time by scripts/optimize-images.mjs and
  // served as plain <picture> elements, so the runtime optimizer is not used.
  // This keeps the site portable to Netlify / Cloudflare Pages without a loader.
  images: { unoptimized: true },
};

export default nextConfig;
