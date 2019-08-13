const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: { app: ["@babel/polyfill", "./src/index.jsx"] },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "portfolio-manager-web-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /js/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".jsx", ".js", ",json"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Analysis",
      template: "./src/index.html"
    })
  ]
};
