var path = require('path');
var assign = require('object-assign');

var defaultConfig = {
    
};

var serverConfig = assign({}, defaultConfig, {
    entry: './src/server.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    target: 'node',
    // do not include polyfills or mocks for node stuff
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },
    // all non-relative modules are external
    // abc -> require('abc')
    externals: /^[a-z\-0-9]+$/,

    // plugins: [
    //     // enable source-map-support by installing at the head of every chunk
    //     new webpack.BannerPlugin('require("source-map-support").install();',
    //         {raw: true, entryOnly: false})
    // ],

    module: {
        loaders: [
            {
                // transpile all .js files using babel
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
});

module.exports = [serverConfig];
