import { Router } from 'express'

import { API_CONSTANTS } from '../config'

const apiRouter = Router()

apiRouter.get(API_CONSTANTS.API_AVALUO.ENDPOINTS.HOME, (_, res) => {
  res.json({
    mensaje: 'API REST activa'
  })
})

export default apiRouter
