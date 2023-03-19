const { merge } = require('webpack-merge')
const path = require('path')
const paths = require('./paths')
const singleSpaDefaults = require('webpack-config-single-spa-react-ts')
const DotenvWebpackPlugin = require('dotenv-webpack')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'Sterling',
    projectName: 'global-product-org',
    webpackConfigEnv,
    argv,
  })

  return merge(defaultConfig, {
    devServer: {
      port: 8082,
    },
    resolve: {
      alias: {
        Components: path.normalize(`${paths.src}/components`),
        Containers: path.normalize(`${paths.src}/containers`),
        Assets: path.normalize(`${paths.src}/assets`),
        Redux: path.normalize(`${paths.src}/redux`),
        Utilities: path.normalize(`${paths.src}/utilities`),
        Config: path.normalize(`${paths.src}/config`),
        Screens: path.normalize(`${paths.src}/screens`),
        Routes: path.normalize(`${paths.src}/routes`),
      },
      symlinks: false,
      cacheWithContext: false,
      extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.mjs', '.css', '.scss', '.sass'],
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        { test: /\.xlsx$/, loader: "webpack-xlsx-loader" },
      ],
    },
    plugins: [
      new DotenvWebpackPlugin({
        path: `./environments/.env${webpackConfigEnv.file ? `.${webpackConfigEnv.file}` : ''}`,
      }),
    ],
    // modify the webpack config however you'd like to by adding to this object
  })
}
