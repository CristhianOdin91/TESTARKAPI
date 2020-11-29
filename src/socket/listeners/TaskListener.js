/**
 * Definición de la clase manejadora de eventos relacionados con las Tareas
 */
import { magenta } from 'chalk'

import logger from '../../../config/logger'
import { TaskService } from '../../services'
import { TaskEmitter } from '../emitters'

class TaskListener {
  constructor () {
    this.events = [
      'task.play'
    ]
  }

  /**
   * Método encargado de gestionar la conexión al socket
   * @param {*} socket
   */
  connection (socket) {
    logger.info(magenta(`Usuario conectado al websocket con ID ${socket.id}`))

    socket.on('disconnect', () => this.disconnect(socket))

    let method
    this.events.forEach(event => {
      method = event.split('.')[1]
      socket.on(event, payload => this[method](socket, payload))
    })
  }

  /**
   * Método encargado de gestionar la desconexión al socket
   * @param {*} socket
   */
  disconnect (socket) {
    logger.info(magenta(`El usuario con ID ${socket.id} ha sido desconectado`))
  }

  /**
   * Método encargado de iniciar el temporizador de una tarea
   * @param {*} socket
   * @param {Object} payload
   */
  async play (socket, payload) {
    let task
    try {
      task = await TaskService.startTask(payload.id)
    } catch (error) {}

    const { _id: id, active, name, description, totalTime, timeLeft } = task
    TaskEmitter.emitStartedTask(socket, { id, active, name, description, totalTime, timeLeft })
  }
}

const obj = new TaskListener()

export { obj as TaskListener }
