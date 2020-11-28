/**
 * Definición de endpoints para las Tareas
 */
import { Router } from 'express'

import { API_CONSTANTS } from '../config'

import { TaskController } from '../controllers'

const router = Router()

router.route(API_CONSTANTS.ARK.ENDPOINTS.TASKS)
  .get(TaskController.index)
  .post(TaskController.create)

router.route(API_CONSTANTS.ARK.ENDPOINTS.TASK)
  .get(TaskController.search)
  .put(TaskController.update)
  .delete(TaskController.destroy)

export { router as taskRoutes }
