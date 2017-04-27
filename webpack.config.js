const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');

const prodFn = (yes) => process.env.NODE_ENV === 'production' ? yes : function() {};
const prodIf = (yes, no) => process.env.NODE_ENV === 'production' ? yes : no;

const cssLoaderOptions = {
  modules: true,
  importLoaders: 1,
  localIdentName: prodIf('[hash:base64:8]', '[folder]_[name]__[local]--[hash:base64:5]')
};

module.exports = {
  context: path.resolve(__dirname, `./src`),
  cache: true,
  devtool: 'source-map',
  devServer: {
    port: 3000,
    inline: true,
    contentBase: `./static`
  },
  entry: {
    'app': ['babel-polyfill', '.']
  },
  module: {
    loaders: [{
        test: /.tsx?$/,
        loaders: ['ts-loader']
      },
      {
        test: /.less$/,
        loaders: ['classnames-loader', 'style-loader', { loader: 'css-loader', options: cssLoaderOptions }, 'postcss-loader', 'less-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: `material.js`,
    filename: "[name].js",
    chunkFilename: "[id].js",
    libraryTarget: `commonjs2`,
  },
  externals: [
    NodeExternals(),
  ],
  resolve: {
    extensions: ['.webpack.js', '.tsx', '.ts', '.js', '.json'],
    alias: {
    }
  },
  plugins: [
    prodFn(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `'production'`
      }
    })),
    prodFn(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })),
    prodFn(new webpack.optimize.AggressiveMergingPlugin()),
    prodFn(new webpack.optimize.OccurrenceOrderPlugin()),
    // prodFn(new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true,
    //     conditionals: true,
    //     unused: true,
    //     comparisons: true,
    //     sequences: true,
    //     dead_code: true,
    //     evaluate: true,
    //     pure_getters: true,
    //     if_return: true,
    //     join_vars: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //   },
    //   output: {
    //     comments: false,
    //   }
    // }))
  ]
};
