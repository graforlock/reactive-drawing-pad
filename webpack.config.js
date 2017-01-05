var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/main.ts',
        route: './src/route.ts'
    },
    output: {
        filename: './dist/[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./dist'] }
        })
    ]
};