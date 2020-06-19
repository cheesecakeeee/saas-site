const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式，表示.css后缀的文件
        use: ['style-loader', 'css-loader'] // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
              // options...
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../images/',
              outputPath: 'images/',
              esModule: false,
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-withimg-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/mystyles.css'
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
}
