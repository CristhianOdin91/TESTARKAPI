import express from 'express'
import { cyan, green } from 'chalk'
import { config as readEnvVars } from 'dotenv'
import bodyParser from 'body-parser'

import { SocketManager } from './socket'
import { API_CONSTANTS } from './config'
import apiRoutes from '../src/routes/api'
import logger from '../config/logger'

readEnvVars()

require('./datasources/MongoDBManager')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const DEFAULT_PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.use(API_CONSTANTS.ARK.URL_BASE, apiRoutes)

const server = app.listen(DEFAULT_PORT, () => {
  if (NODE_ENV !== 'test') {
    logger.info(green(`El servidor se encuentra activo en el puerto ${DEFAULT_PORT}`))

    if (NODE_ENV !== 'production') {
      logger.info(cyan('Servidor iniciado como desarrollo'))
    }
  }
})

SocketManager(server)

export { app, server }
