/**
 * Servicio de Tareas
 */
import { Task } from '../models'
import { NotFoundError } from '../errors'
import { lorem } from '../utils'

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

    const filters = {
      erased: false
    }

    const data = await Task.find(filters)
      .select({
        createdAt: 0,
        updatedAt: 0
      })
      .skip(Number(page - 1) * perPage)
      .limit(Number(perPage))

    const total = await Task.find(filters).countDocuments()
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
   * Método encargado de buscar una tarea
   * @param {String} id
   */
  async searchTask (id) {
    const data = await Task.findOne({
      _id: id,
      erased: false
    })
      .select({
        createdAt: 0,
        updatedAt: 0
      })

    if (!data) {
      throw new NotFoundError('No se encontró la tarea solicitada')
    }

    return data
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

  /**
   * Método encargado de actualizar una tarea
   * @param {String} id
   * @param {Object} filters
   */
  async updateTask (id, { name, description }) {
    const task = await Task.findOne({
      _id: id,
      erased: false
    })
      .select({
        createdAt: 0,
        updatedAt: 0
      })

    if (!task) {
      throw new NotFoundError('No se encontró la tarea solicitada')
    }

    task.name = name
    task.description = description || ''

    task.save()

    return task
  }

  /**
   * Método encargado de hacer un borrado lógico a la tarea
   * @param {String} id
   */
  async removeTaskFromList (id) {
    const task = await Task.findOne({
      _id: id,
      erased: false
    })
      .select({
        createdAt: 0,
        updatedAt: 0
      })

    if (!task) {
      throw new NotFoundError('No se encontró la tarea solicitada')
    }

    task.priority = null
    task.erased = true

    task.save()

    return task
  }

  /**
   * Método encargado de prellenar la base de datos con tareas aleatorias
   */
  async randomFill (finished = true) {
    const tasksToGenerate = 50
    const mockTasks = []
    const validTimes = [1800000, 3600000, 5400000]

    let totalTime

    for (let i = 0; i < tasksToGenerate; i++) {
      totalTime = validTimes[Math.floor(Math.random() * validTimes.length)]

      mockTasks.push({
        name: lorem.generateSentences(1),
        description: lorem.generateSentences(3),
        totalTime,
        timeLeft: Math.floor(totalTime * (Math.random() * 0.2)),
        finished
      })
    }

    await Task.create(mockTasks)
  }
}

const obj = new TaskService()

export { obj as TaskService }
