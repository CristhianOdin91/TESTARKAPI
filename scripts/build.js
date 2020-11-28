const webpack = require('webpack')
const chalk = require('chalk')

const webpackConfig = require('../config/webpack.config')
const logger = require('../config/logger')

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    logger.error(chalk.red('Ocurrió un error durante el empaquetado del proyecto'))
    logger.error(chalk.red(stats))
  } else {
    logger.info(chalk.cyan('El empaquetado del proyecto se realizó de manera correcta'))
  }
})
