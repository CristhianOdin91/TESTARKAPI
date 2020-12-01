/**
 * Definición de la clase manejadora de eventos relacionados con las Tareas
 */
import { magenta, red } from 'chalk'

import logger from '../../../config/logger'
import { TaskService } from '../../services'
import { TaskEmitter } from '../emitters'

class TaskListener {
  constructor () {
    this.events = {
      task: {
        play: 'task.play',
        pause: 'task.pause'
      }
    }
  }

  /**
   * Método encargado de gestionar la conexión al socket
   * @param {*} socket
   */
  connection (socket) {
    logger.info(magenta(`Usuario conectado al websocket con ID ${socket.id}`))

    socket.on('disconnect', () => this.disconnect(socket))

    socket.on(this.events.task.play, payload => this.play(socket, payload))
    socket.on(this.events.task.pause, payload => this.pause(socket, payload))
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
    } catch (error) {
      logger.error(red(error))
    }

    const { _id: id, active, name, description, totalTime, timeLeft } = task
    TaskEmitter.emitStartedTask(socket, { id, active, name, description, totalTime, timeLeft })
  }

  /**
   * Método encargado de pausar el temporizador de una tarea
   * @param {*} socket
   * @param {Object} payload
   */
  async pause (socket, payload) {
    let timelog
    try {
      timelog = await TaskService.pauseTask(payload.id)
    } catch (error) {
      logger.error(red(error))
    }

    TaskEmitter.emitPausedTask(socket, timelog)
  }
}

const obj = new TaskListener()

export { obj as TaskListener }
