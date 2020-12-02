/**
 * Definición de endpoints para las Tareas
 */
import { Router } from 'express'

import { API_CONSTANTS } from '../config'

import { TaskValidator } from '../validators'
import { TaskController } from '../controllers'

const router = Router()

router.route(API_CONSTANTS.ARK.ENDPOINTS.TASKS)
  .get(TaskController.index)
  .post(TaskValidator.validateCreation, TaskController.create)

router.get(API_CONSTANTS.ARK.ENDPOINTS.TASK_ACTIVE, TaskController.active)
router.post(API_CONSTANTS.ARK.ENDPOINTS.TASKS_RANDOMIZER, TaskController.randomizer)

router.route(API_CONSTANTS.ARK.ENDPOINTS.TASK)
  .get(TaskValidator.validateId, TaskController.search)
  .patch(TaskValidator.validateId, TaskValidator.validateUpdate, TaskController.update)
  .delete(TaskValidator.validateId, TaskController.destroy)

export { router as taskRoutes }
