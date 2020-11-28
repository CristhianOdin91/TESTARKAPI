import { Router } from 'express'

import { API_CONSTANTS } from '../config'

import { taskRoutes } from './tasks'

const apiRouter = Router()

apiRouter.get(API_CONSTANTS.ARK.ENDPOINTS.HOME, (_, res) => {
  res.json({
    message: 'API REST activa'
  })
})

apiRouter.use(taskRoutes)

export default apiRouter
