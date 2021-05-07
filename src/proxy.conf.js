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
    },

    {
        context: ['/tmdb-img'],
        target: 'https://image.tmdb.org/t/p',
        secure: false,
        pathRewrite: {
            '^/tmdb-img': ''
        },
        changeOrigin: true
    },
    {
        context: ['/tmdb'],
        target: 'https://api.themoviedb.org/3',
        secure: false,
        pathRewrite: {
            '^/tmdb': ''
        },
        changeOrigin: true
    }
];

module.exports = proxyConfig;
