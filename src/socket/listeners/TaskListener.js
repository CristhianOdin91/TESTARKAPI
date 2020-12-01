/**
 * Definición de la clase manejadora de eventos relacionados con las Tareas
 */
import Moment from 'moment-timezone'
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

    this.statusInterval = 1000

    this.taskState = {
      activeTask: '',
      timerHandler: ''
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
    let timelog
    try {
      ({ task, timelog } = await TaskService.startTask(payload.id))
    } catch (error) {
      logger.error(red(error))
    }

    const { _id: id, active, name, description, totalTime, timeLeft } = task
    TaskEmitter.emitStartedTask(socket, { id, active, name, description, totalTime, timeLeft })

    this.taskState.activeTask = id
    this.taskState.timerHandler = setInterval(() => {
      TaskEmitter.emitTaskStatus(socket, {
        timeLeft: timeLeft - Math.abs(Moment().tz('America/Mexico_City').diff(Moment(timelog.startedAt)))
      })
    }, this.statusInterval)
  }

  /**
   * Método encargado de pausar el temporizador de una tarea
   * @param {*} socket
   * @param {Object} payload
   */
  async pause (socket, payload) {
    let task
    let timelog
    try {
      ({ task, timelog } = await TaskService.pauseTask(payload.id))
    } catch (error) {
      logger.error(red(error))
    }

    clearInterval(this.taskState.timerHandler)
    TaskEmitter.emitPausedTask(socket, { task, timelog })
  }
}

const obj = new TaskListener()

export { obj as TaskListener }
