/**
 * Servicio de Tareas
 */
import { Task } from '../models'

class TaskService {
  /**
   * Método encargado de recuperar todas las tareas
   * @param {Number} page
   * @param {Number} perPage
   * @param {String} name
   * @param {Number} totalTime
   * @param {Boolean} finished
   */
  async getTasks ({ page, perPage, name, totalTime, finished }) {
    page = page || 1
    perPage = perPage || 10

    const data = await Task.find()
      .select({
        createdAt: 0,
        updatedAt: 0
      })
      .skip(Number(page - 1) * perPage)
      .limit(Number(perPage))

    const total = await Task.find().countDocuments()
    const currentPage = Number(page)
    const lastPage = Math.ceil(total / perPage)
    const hasMorePages = page < lastPage

    return {
      data,
      total,
      perPage: Number(perPage),
      currentPage,
      lastPage,
      hasMorePages
    }
  }

  /**
   * Método encargado de crear una nueva Tarea
   * @param {String} name
   * @param {String} description
   * @param {Number} totalTime
   */
  async createTask ({ name, description, totalTime }) {
    const data = await Task.create({ name, description, totalTime, timeLeft: totalTime })

    return data
  }
}

const obj = new TaskService()

export { obj as TaskService }
