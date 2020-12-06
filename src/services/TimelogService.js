/**
 * Servicio de Registros de Tiempo
 */
import Moment from 'moment-timezone'

import { Timelog } from '../models'
import { CreateTimelogError, NotFoundError } from '../errors'
import { getCurrentTime } from '../utils'

class TimelogService {
  /**
   * Método encargado de crear un nuevo Registro de Tiempo
   * @param {String} task
   * @param {Date} startedAt
   */
  async createTimelog ({ task, startedAt }) {
    const timelog = await Timelog.create({ task: task._id, startedAt })

    if (!timelog) {
      throw new CreateTimelogError('Se produjo un error al crear el registro de tiempo')
    }

    return timelog
  }

  /**
   * Método encargado de crear un nuevo Registro de Tiempo a partir de una Tarea finalizada
   * @param {Task} finishedTask
   */
  async createFinishedTimelogFromTask (finishedTask) {
    const { _id: task, startedAt, finishedAt, totalTime, timeLeft } = finishedTask
    const elapsedTime = totalTime - timeLeft

    const timelog = await Timelog.create({ task, startedAt, finishedAt, elapsedTime })

    if (!timelog) {
      throw new CreateTimelogError('Se produjo un error al crear el registro de tiempo')
    }

    return timelog
  }

  /**
   * Método encargado de buscar un Registro de Tiempo
   * @param {String} id
   */
  async searchTimelog (id) {
    const timelog = await Timelog.findById(id)

    if (!timelog) {
      throw new NotFoundError('No se encontró el registro de tiempo solicitado')
    }

    return timelog
  }

  /**
   * Método para finalizar un Registro de Tiempo
   * @param {Timelog} timelog
   */
  finishTimelog (timelog) {
    const currentTime = getCurrentTime()
    const pastTime = Moment(timelog.startedAt)

    timelog.finishedAt = currentTime.format()
    timelog.elapsedTime = Math.abs(currentTime.diff(pastTime))

    timelog.save()
  }
}

const obj = new TimelogService()

export { obj as TimelogService }
