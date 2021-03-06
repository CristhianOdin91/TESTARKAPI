/**
 * Controlador de Tareas
 */
import { TaskService } from '../services'

class TaskController {
  /**
   * Método encargado de responder con todas las tareas
   * @param {*} req
   * @param {*} res
   */
  async index (req, res) {
    const page = req.query || 1
    const perPage = req.perPage || 10

    const taskPagination = await TaskService.getTasks({
      page,
      perPage,
      finished: false
    })

    res.json({
      message: 'Las tareas fueron recuperadas',
      ...taskPagination
    })
  }

  /**
   * Método encargado de responder con la tarea solicitada
   * @param {*} req
   * @param {*} res
   */
  async search (req, res) {
    let data

    try {
      data = await TaskService.searchTask(req.params.id)
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

    if (!res.headersSent) {
      res.json({
        message: 'La tarea fue recuperada',
        data
      })
    }
  }

  /**
   * Método encargado de crear una tarea y responder con la tarea creada
   * @param {*} req
   * @param {*} res
   */
  async create (req, res) {
    let task

    try {
      task = await TaskService.createTask(req.body)
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

    const data = { _id: task._id }

    if (!res.headersSent) {
      res.json({
        message: 'La tarea fue creada',
        data
      })
    }
  }

  /**
   * Método encargado de actualizar una tarea y responder con la tarea actualizada
   * @param {*} req
   * @param {*} res
   */
  async update (req, res) {
    let task

    try {
      task = await TaskService.updateTask(req.params.id, req.body)
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

    const data = { _id: task._id }

    if (!res.headersSent) {
      res.json({
        message: 'La tarea fue actualizada',
        data
      })
    }
  }

  /**
   * Método encargado de eliminar una tarea
   * @param {*} req
   * @param {*} res
   */
  async destroy (req, res) {
    try {
      await TaskService.removeTaskFromList(req.params.id)
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

    if (!res.headersSent) {
      res.json({
        message: 'La tarea fue eliminada'
      })
    }
  }

  /**
   * Método encargado de prellenar la base de datos con tareas aleatorias
   * @param {*} req
   * @param {*} res
   */
  async randomizer (req, res) {
    const finished = !(req.query.finished === 'false')

    try {
      await TaskService.randomFill(finished)
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

    if (!res.headersSent) {
      res.json({
        message: 'Las tareas se generaron correctamente'
      })
    }
  }

  /**
   * Método encargado de responder con la Tarea en curso
   * @param {*} req
   * @param {*} res
   */
  async active (_, res) {
    let data

    try {
      data = await TaskService.getActiveTask()
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

    if (!res.headersSent) {
      res.json({
        message: 'La tarea fue recuperada',
        data
      })
    }
  }

  /**
   * Método encargado de responder con las tareas finalizadas
   * @param {*} req
   * @param {*} res
   */
  async getFinished (req, res) {
    const page = req.query || 1
    const perPage = req.perPage || 10

    const taskPagination = await TaskService.getTasks({
      page,
      perPage,
      finished: true
    })

    res.json({
      message: 'Las tareas fueron recuperadas',
      ...taskPagination
    })
  }
}

const obj = new TaskController()

export { obj as TaskController }
