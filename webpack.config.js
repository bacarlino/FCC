module.exports = {
  context: __dirname + '/src/',
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
    path: __dirname + '/src/',
    filename: 'client.min.js'
  }
};
