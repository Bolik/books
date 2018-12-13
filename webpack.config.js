let debug = process.env.NODE_ENV !== "production",
    webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : "eval",
    entry: [path.join(__dirname, "src", "index.web.jsx")],
    output: {
        path: path.join(__dirname, "web"),
        publicPath: "",
        filename: "app.js"
    },
    resolve: {
	symlinks: false,
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".jsx", ".js", ".json"],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ],
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {

                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devServer : {
	host: '0.0.0.0',
	port: 8092,
        open: true,
	disableHostCheck: true,
	hot: false,
	inline: false,
	quiet: true,
	contentBase: "web",
	watchContentBase: false,
        noInfo: true,
        overlay: {
            warnings: true,
            errors: true
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
	    ignore: /node_modules/
        }
    },
    plugins: debug ? [
        new HtmlWebpackPlugin({
            title: "библиотека",
            inject: true,
            hash: true,
            template: "src/index.ejs"
        })
    ] : [
        new HtmlWebpackPlugin({
            title: "библиотека",
            inject: true,
            hash: true,
            template: "src/index.ejs"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
	new UglifyJsPlugin({
	    sourceMap: true,
            parallel: true,
            uglifyOptions: {
                ecma: 8,
		mangle: false
            }
	})
    ]
}
