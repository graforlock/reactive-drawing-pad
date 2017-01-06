var webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

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
    target: 'electron',
    plugins: [
        new UglifyJsPlugin({ minimize: true }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./dist/views'] }
        })
    ]
};