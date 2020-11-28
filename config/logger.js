const log4js = require('log4js')
const chalk = require('chalk')

const GLOBAL_CONSTANTS = require('./global.constants.json')

const opts = {
  appenders: {
    out: {
      type: 'stdout'
    },
    main: {
      type: 'file',
      filename: `${GLOBAL_CONSTANTS.LOG_DIRECTORY}/${GLOBAL_CONSTANTS.LOG_FILE_NAME}`
    }
  },
  categories: {
    default: {
      appenders: ['out', 'main'],
      level: 'trace'
    }
  }
}

log4js.configure(opts)

const logger = log4js.getLogger('out')

logger.level = process.env.LOG_LEVEL || 'trace'

process.on('unhandledRejection', err => {
  logger.error(chalk.red(err))
})

process.on('warning', ({ name, message, stack }) => {
  if (name !== 'ExperimentalWarning') {
    logger.warn(chalk.yellow(name, message, stack))
  }
})

module.exports = logger
