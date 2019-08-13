const common = require("./webpack.common");
const merge = require("webpack-merge");
const DashboardPlugin = require("webpack-dashboard");
const webpack = require("webpack");
const path = require('path');

module.exports = merge(common, { // lets you provide options for webpack-serve
    devtool: "source-map", // enum
    mode: "development",
    // lets you precisely control what bundle information gets displayed
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:9999/api'
        },
        port:3000,
        contentBase: path.resolve(__dirname, "public"),
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        //new DashboardPlugin(),
        new webpack.DefinePlugin({
            VERSION: require("./package.json").version
        }),
    ]}
);
