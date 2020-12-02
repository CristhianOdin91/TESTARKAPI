/**
 * Servicio de Registros de Tiempo
 */
import Moment from 'moment-timezone'

import { Timelog } from '../models'
import { CreateTimelogError, NotFoundError } from '../errors'

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
    const currentTime = Moment().tz('America/Mexico_City')
    const pastTime = Moment(timelog.startedAt)

    timelog.finishedAt = currentTime.format()
    timelog.elapsedTime = Math.abs(currentTime.diff(pastTime))

    timelog.save()
  }
}

const obj = new TimelogService()

export { obj as TimelogService }
