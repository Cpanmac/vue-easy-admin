const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cwd = process.cwd()
const outputDir = path.resolve(cwd, './dist')
const srcDir = path.resolve(cwd, './src')
const pagesDir = path.resolve(cwd, './src/pages')
const configDir = path.resolve(cwd, './container.js')
let myConfig = {}
if (fs.existsSync(configDir)) {
  myConfig = require(configDir)
}
let define = {}
for (let key in myConfig.define) {
  define[key] = JSON.stringify(myConfig.define[key])
}
module.exports = {
  outputDir,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        ...define,
        srcDir: JSON.stringify(srcDir),
        cwdDir: JSON.stringify(cwd),
        pagesDir: JSON.stringify(pagesDir),
        config: JSON.stringify(myConfig)
      })
      return definitions
    })
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.configFile = path.resolve(__dirname, '.eslintrc.js')
        return options
      })
    config.module
      .rule('js')
      .use('babel-loader')
      .tap((options = {}) => {
        options.configFile = path.resolve(__dirname, 'babel.config.js')
        return options
      })
  },
  configureWebpack: merge(
    {
      resolve: {
        alias: {
          'element-ui': path.resolve(__dirname, './node_modules/element-ui'),
          iass: path.resolve(__dirname, './src/iass'),
          sass: path.resolve(__dirname, './src/sass'),
          _src: path.resolve(__dirname, './src')
        }
      },
      devServer: {
        before: require('./src/sass/mock/mock-server'),
        proxy: myConfig.proxy
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: path.resolve(cwd, './public'),
            to: path.resolve(outputDir, './public')
          }
        ])
      ]
    },
    myConfig.configureWebpack
  )
}
