const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss', '/index.vue', '/Index.vue']
    },
    plugins: [
      new webpack.ProvidePlugin({
        utils: [path.resolve(__dirname, 'src/utils.js'), 'default']
      }),
      new CaseSensitivePathsPlugin()
    ]
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  assetsDir:'static',
  //  从 Vue CLI 3.3 起baseUrl已弃用，请使用publicPath.
  publicPath:process.env.NODE_ENV === "production" ? 'http://static.chinagoods.com': "/"
}
