import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@solana/web3.js", "@solana/spl-token"],
  typescript: {
    ignoreBuildErrors: true, // This is set to true to ignore TypeScript errors during the build process
  }
};

export default nextConfig;
