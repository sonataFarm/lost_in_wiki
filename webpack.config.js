// webpack.config.js
var path = require('path');

module.exports = {
  entry: "./frontend/entry.jsx",
  output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
};
