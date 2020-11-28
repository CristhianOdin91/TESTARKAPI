module.exports = {
  mode: 'production',
  entry: './src/server.js',
  output: {
    filename: 'main.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: true
                }
              }
            ]
          ]
        }
      }
    }]
  },
  target: ['node', 'es2017']
}
