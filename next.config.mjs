/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Pages retired in the simplified site structure
  async redirects() {
    return [
      { source: "/treatments", destination: "/services", permanent: true },
      { source: "/pricing", destination: "/services", permanent: true },
      { source: "/skin-concerns", destination: "/services", permanent: true },
      { source: "/results", destination: "/", permanent: true },
      { source: "/reviews", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
