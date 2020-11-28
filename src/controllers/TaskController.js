/**
 * Controlador de Tareas
 */
class TaskController {
  /**
   * Método encargado de responder con todas las tareas
   * @param {*} req
   * @param {*} res
   */
  async index (_, res) {
    res.json({
      message: 'Las tareas fueron recuperadas'
    })
  }

  /**
   * Método encargado de responder con la tarea solicitada
   * @param {*} req
   * @param {*} res
   */
  async search (req, res) {
    res.json({
      message: 'La tarea fue recuperada'
    })
  }

  /**
   * Método encargado de crear una tarea y responder con la tarea creada
   * @param {*} req
   * @param {*} res
   */
  async create (req, res) {
    res.json({
      message: 'La tarea fue creada'
    })
  }

  /**
   * Método encargado de actualizar una tarea y responder con la tarea actualizada
   * @param {*} req
   * @param {*} res
   */
  async update (req, res) {
    res.json({
      message: 'La tarea fue actualizada'
    })
  }

  /**
   * Método encargado de eliminar una tarea
   * @param {*} req
   * @param {*} res
   */
  async destroy (req, res) {
    res.json({
      message: 'La tarea fue eliminada'
    })
  }
}

const obj = new TaskController()

export { obj as TaskController }
