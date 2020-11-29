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
    const taskPagination = await TaskService.getTasks(req.query)

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
    const data = await TaskService.createTask(req.body)

    res.json({
      message: 'La tarea fue creada',
      data
    })
  }

  /**
   * Método encargado de actualizar una tarea y responder con la tarea actualizada
   * @param {*} req
   * @param {*} res
   */
  async update (req, res) {
    let data

    try {
      data = await TaskService.updateTask(req.params.id, req.body)
    } catch (error) {
      const { message, code } = error
      res.status(code).json({ message })
    }

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
  async randomizer (_, res) {
    try {
      await TaskService.randomFill()
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
}

const obj = new TaskController()

export { obj as TaskController }
