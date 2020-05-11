const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['semantic-ui-react'],
    app: './src/index.js'
  },
  output: {
    // 输出到bundle 放到 static 文件夹 
    // 'static' directory
    filename: 'static/[name].[hash].js',
    //输出到dist 目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // 切换成 production source maps
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
          use: [
            {
              //  configure 'MiniCssExtractPlugin'              
              loader: MiniCssExtractPlugin.loader,
            }, 
            {
              loader: 'css-loader',
              options: {
                modules: true,
                // Allows to configure how many loaders 
                importLoaders: 1,
                localsConvention: 'camelCase',
                // Create source maps for CSS files
                sourceMap: true
              }
            },
            {
           
              // minify and autoprefix our CSS rules.
              loader: 'postcss-loader',
            }
          ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    
    // Create the stylesheet under 'styles' directory
    new MiniCssExtractPlugin({
      filename: 'styles/styles.[hash].css'
    })
  ]
};