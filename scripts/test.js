import { execSync } from 'child_process'

import logger from '../config/logger'

const argv = process.argv.slice(2)

const isInGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch (e) {
    logger.info('No se encontró un control de versiones')
    return false
  }
}

if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  const hasSourceControl = isInGitRepository()
  argv.push(hasSourceControl ? '--watch' : '--watchAll')
}

argv.push('--detectOpenHandles')

run(argv)
