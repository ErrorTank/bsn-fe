import {merge} from "webpack-merge";
import webpack from 'webpack';
import COMMON_CONFIG from "./common.config.js";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import { join } from "path";
import {
  PATH_BUILD,
  PATH_POST_CSS_CONFIG,
  PATH_NODE_MODULES,
  PATH_SRC,
  PATH_ASSETS,
  PORT,
  HOST,
} from "./settings.js";

const DEV_CONFG = merge(COMMON_CONFIG, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "js/bundle.js",
    chunkFilename: "js/[name].bundle.js",
    path: PATH_BUILD,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: PATH_POST_CSS_CONFIG,
              },
            },
          },
        ],
        exclude: [PATH_NODE_MODULES],
        include: [PATH_SRC],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATH_ASSETS,
          to: PATH_BUILD,
          globOptions: {
            ignore: "index.html",
          },
          noErrorOnMissing: true
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: join(PATH_ASSETS, "./index.html"),
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin()
  ],
  performance: {
    hints: false,
  },
  devServer: {
    hot: true,
    open: true,
    host: HOST,
    port: PORT,
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  optimization: {
    moduleIds: 'named'
  }
});

export default DEV_CONFG;
