var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    name: "server",
    entry: "./graphQLServer.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    plugins: ["./tools/BabelRelayPlugin"]
                },

                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    externals: nodeModules
};
