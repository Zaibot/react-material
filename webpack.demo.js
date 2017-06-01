const path = require(`path`);
const webpack = require(`webpack`);
const NodeExternals = require(`webpack-node-externals`);

const prodFn = (yes) => process.env.NODE_ENV === `production` ? yes : function() {};
const prodIf = (yes, no) => process.env.NODE_ENV === `production` ? yes : no;

const babelOptions = {
  cacheDirectory: true,
  presets: [
    ["es2015", {
      "modules": false
    }]
  ]
};
const cssLoaderOptions = {
  modules: true,
  importLoaders: 1,
  localIdentName: `[folder]-[local]__[hash:base64:5]`
};

module.exports = {
  context: path.resolve(__dirname, `./src`),
  cache: true,
  devtool: `source-map`,
  devServer: {
    port: 3000,
    inline: true,
    contentBase: path.resolve(__dirname, `./static`)
  },
  entry: {
    'index': [`babel-polyfill`, `./demo`]
  },
  module: {
    loaders: [{
        test: /\.tsx?$/,
        loaders: [{
          loader: `babel-loader`,
          options: babelOptions
        }, `ts-loader`]
      },
      {
        test: /\.less$/,
        loaders: [`classnames-loader`, `style-loader`, {
          loader: `css-loader`,
          options: cssLoaderOptions
        }, `postcss-loader`, `less-loader`]
      },
      {
        test: /\.css$/,
        loaders: [`classnames-loader`, `style-loader`, {
          loader: `css-loader`,
          options: cssLoaderOptions
        }, `postcss-loader`]
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, `./demo`),
    filename: `[name].js`,
  },
  resolve: {
    extensions: [`.webpack.js`, `.tsx`, `.ts`, `.js`, `.json`],
  },
  plugins: [
    prodFn(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"production"`
      }
    })),
    prodFn(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })),
    prodFn(new webpack.optimize.AggressiveMergingPlugin()),
    prodFn(new webpack.optimize.OccurrenceOrderPlugin()),
    prodFn(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        pure_getters: true,
        if_return: true,
        join_vars: true,
        unsafe: false,
        unsafe_comps: false,
      },
      output: {
        comments: false,
      }
    }))
  ]
};