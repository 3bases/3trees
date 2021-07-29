//@ts-check
const withTM = require('next-transpile-modules')(['three'])

module.exports = withTM({
  target: 'serverless',
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Credentials',
          value: 'true',
        },
        {
          key: 'Access-Control-Allow-Origin',
          value: '*',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: `X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version`,
        },
      ],
    },
  ],
  webpack: config => {
    config.externals.push('sharp')
    return config
  },
  webpack5: true,
  reactStrictMode: true,
  rewrites: async () => [{ source: '/social.png', destination: '/api/social-image' }],
})
