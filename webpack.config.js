var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/main.ts',
        route: './src/route.ts'
    },
    output: {
        filename: './dist/views/[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./dist/views'] }
        })
    ]
};