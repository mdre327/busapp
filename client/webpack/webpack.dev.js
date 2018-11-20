var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

var LiveReloadPlugin = require('webpack-livereload-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'dev';
const METADATA = webpackMerge(commonConfig.metadata, {
    ENV: ENV,
});
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval',
    watchOptions : {
        ignored: /dist/
    },

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV)
            }
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
        
        new LiveReloadPlugin({
            "appendScriptTag": true,
        "port": 35729
        }),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});