const proxyConfig = [
    {
        context: ['/omdb'],
        target: 'http://www.omdbapi.com',
        secure: false,
        pathRewrite: {
            '^/omdb': ''
        },
        changeOrigin: true
    },
    {
        context: ['/trakt'],
        target: 'https://api.trakt.tv',
        secure: false,
        pathRewrite: {
            '^/trakt': ''
        },
        changeOrigin: true
    }
];

module.exports = proxyConfig;
