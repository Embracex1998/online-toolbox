import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/online-toolbox",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
