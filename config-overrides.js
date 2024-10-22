const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
} = require("customize-cra");
const webpack = require("webpack");

module.exports = override(
  addWebpackAlias({
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    url: require.resolve("url/"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  )
);
