/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
