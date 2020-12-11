const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');

module.exports = function (env, entry) {
  return {
    entry: ['./src/styles/main.scss', './src/scripts/main.js'],

    mode: 'production',

    optimization: {
      splitChunks: {
        cacheGroups: {
          // Enforce single file for css
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]/main.js',
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: require.resolve('css-loader'),
            },
            {
              loader: require.resolve('postcss-loader'),
            },
            {
              loader: require.resolve('sass-loader'),
            },
            {
              loader: require.resolve('import-glob-loader'),
            },
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]/main.css',
      }),
      // new CopyPlugin([
      //     {
      //         from: 'src3/images',
      //         to: 'dist/images',
      //     },
      //     {
      //         from: 'src3/fonts',
      //         to: 'dist/fonts',
      //     },
      // ]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        plugins: [imageminSvgo(), imageminMozjpeg(), imageminOptipng()],
      }),
    ],
  };
};
