import {PATH_SRC_INDEX, PATH_SRC, PATH_NODE_MODULES}  from "./settings.js";

const COMMON_CONFIG = {
  entry: [PATH_SRC_INDEX],
  resolve: {
    // alias: {

    // }
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: [PATH_NODE_MODULES],
        include: [PATH_SRC],
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: "svg-react-loader",
      },
      {
        test: /\.(bmp|jpe?g|png|gif)$/i,
        loader: "url-loader",
        options: {
          name: "images/[name].[hash:8].[ext]",
          limit: 10000,
        },
      },
    ]
  }
};

export default COMMON_CONFIG;