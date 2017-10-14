// webpack.config.js
var path = require('path');
var test = "TEST";

module.exports = {
  entry: "./frontend/entry.jsx",
  output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        query: {
          presets: ['es2015', 'react', 'stage-2']
        },
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
};
