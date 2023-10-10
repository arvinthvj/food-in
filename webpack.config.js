const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      fs: false,
      crypto: false,
      os: false,
      path: false,
      buffer: false,
    },
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".jsx",
      ".json",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".svg",
    ],
    alias: {
      Assets: path.resolve(__dirname, "assets/"),
    },
    modules: [path.join(__dirname, "js/helpers"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "[name].[ext]",
            outputPath: "images",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|jpg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: false,
    }),
    new webpack.ProvidePlugin({
      sodium: "libsodium-wrappers",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
