const rimraf = require('rimraf')
const chalk = require('chalk')

const logger = require('../config/logger')

rimraf('./dist', error => {
  if (error) {
    logger.error(chalk.red('Ocurrió un error al limpiar el directorio de distribución'))
    logger.error(error)
  }
})
