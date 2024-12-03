/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'wsrv.nl',
                port: '',
            },
        ],
    },
};

export default nextConfig;
