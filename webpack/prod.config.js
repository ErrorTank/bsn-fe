import {merge} from "webpack-merge";
import webpack from "webpack";
import COMMON_CONFIG from "./common.config.js";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin";
import InlineSourcePlugin from 'html-webpack-inline-source-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PurgecssPlugin from "purgecss-webpack-plugin";
import CompressionPlugin from 'compression-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { PATH_ASSETS, PATH_DIST, PATH_INDEX_HTML } from "./settings.js";

const PROD_CONFIG = merge(COMMON_CONFIG, {
  mode: "production",
  bail: true,
  devtool: false,
  output: {
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].chunk.js",
    path: PATH_DIST,
    clean: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATH_ASSETS,
          to: PATH_DIST,
          globOptions: {
            ignore: "index.html",
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: PATH_INDEX_HTML,
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      inlineSource: "runtime~.+\\.js",
    }),
    new InlineSourcePlugin(),
    new PreloadWebpackPlugin({
      as(entry) {
        if (/\.css$/.test(entry)) return "style";
        if (/\.(woff|woff2|otf|ttf|eot)$/.test(entry)) return "font";
        return "script";
      },
      rel: "preload",
      include: "initial",
      exclude: "runtime",
      fileBlacklist: [/\.map$/, /runtime.*.js/],
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].chunk.css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATH_SRC}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      filename: "[path].gz[query]",
      algorithm: "gzip",
    }),
    new BundleAnalyzerPlugin({ analyzerMode: "static" }),
  ],
  optimization: {
    moduleIds: 'hashed',
    chunkIds: 'named',
    runtimeChunk: true,
    concatenateModules: true,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          },
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        terserOptions: {
          verbose: true,
          beautify: false,
          comments: false,
          warnings: false,
          compress: {
            ecma: 5,
            loops: true,
            dead_code: true,
            computed_props: true,
            conditionals: true,
            unsafe_math: true,
            unsafe_regexp: false,
            unsafe_proto: true,
            unsafe_undefined: true,
            unsafe_Function: true,
            unused: true,
            booleans: true,
            sequences: true,
            drop_console: true,
          },
          output: {
            ecma: 5,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
});

export default PROD_CONFIG;