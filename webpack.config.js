var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  node: {
    child_process: 'empty'
  },
  entry: "./src/main.js",
  output: {
    path: 'dist/',
    filename: 'media-cropper.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
     {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-class-properties', 'transform-decorators-legacy'],
      }
    },
      {
        //images
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=8192',
          'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
  ]
  },
  plugins: debug ? [definePlugin] : [
    definePlugin,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
  ],
};
