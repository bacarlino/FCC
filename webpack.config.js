module.exports = {
  context: __dirname + '/docs/',
  entry: './js/client.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    path: __dirname + '/docs/',
    filename: 'client.min.js'
  }
};
