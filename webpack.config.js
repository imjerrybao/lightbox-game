var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/lightboxgame.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "lightboxgame.js"
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ],
    }
};
