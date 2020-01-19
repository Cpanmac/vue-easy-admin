#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const cliService = require('./cli-service')
const Package = require('../package.json')
const rootdir = path.resolve(__dirname, '../')
const cwd = process.cwd()
function run (argv) {
  let arg0 = argv[0]
  if (arg0 === '-v' || arg0 === '--version') {
    console.log(Package.version)
  } else if (arg0 === '-h' || arg0 === '--help') {
    console.log('  usage:')
    console.log('  -v --version     [查看版本]')
    console.log('  permission       [生成权限文件夹]')
    console.log('  run **           [运行vue-cli 命令]')
  } else if (arg0 === 'run') {
    copyEslintrc()
    cliService(process.argv.slice(3))
  } else if (arg0 === 'permission') {
    require('../src/sass/permission/build')()
  }
}

run(process.argv.slice(2))

function copyEslintrc () {
  const fileName = '.eslintrc.js'
  fs.copyFile(
    path.resolve(rootdir, fileName),
    path.resolve(cwd, fileName),
    err => {
      if (err) throw err
    }
  )
}
