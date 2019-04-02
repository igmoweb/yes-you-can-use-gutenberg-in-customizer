const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

// Set different CSS extraction for editor only and common block styles
const stylesCSSPlugin = new MiniCssExtractPlugin( {
  filename: './_build/css/style.css',
} );

module.exports = {
  entry: {
    './_build/js/customizer' : './_src/index.js',
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  mode: 'production' !== process.env.NODE_ENV ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /style\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            query: {
              outputStyle:
                  'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    stylesCSSPlugin,
  ],
  externals: {
    backbone: 'Backbone',
    jquery: 'jQuery',
    lodash: 'lodash',
    moment: 'moment',
    react: 'React',
    'react-dom': 'ReactDOM',
    tinymce: 'tinymce',
    wp: 'wp',
  },
};
