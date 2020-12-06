/**
 * Definición de la clase manejadora de eventos relacionados con las Tareas
 */
import Moment from 'moment-timezone'
import { magenta, red } from 'chalk'

import logger from '../../../config/logger'
import { TaskService } from '../../services'
import { TaskEmitter } from '../emitters'
import { NotFoundError } from '../../errors'
import { getCurrentTime } from '../../utils'

class TaskListener {
  constructor () {
    this.events = {
      task: {
        play: 'task.play',
        pause: 'task.pause',
        stop: 'task.stop',
        finish: 'task.finish'
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
    socket.on(this.events.task.stop, payload => this.stop(socket, payload))
    socket.on(this.events.task.finish, payload => this.finish(socket, payload))
  }

  /**
   * Método encargado de gestionar la desconexión al socket
   * @param {*} socket
   */
  async disconnect (socket) {
    logger.info(magenta(`El usuario con ID ${socket.id} ha sido desconectado`))

    let activeTask

    try {
      activeTask = await TaskService.getActiveTask()

      const { _id: id } = activeTask
      await TaskService.pauseTask(id)

      logger.info(magenta(`La Tarea con ID ${id} ha sido pausada`))
    } catch (error) {
      const { message } = error

      if (error instanceof NotFoundError) {
        logger.info(magenta(message))
      } else {
        logger.error(red(message))
      }
    }
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
        timeLeft: timeLeft - Math.abs(getCurrentTime().diff(Moment(timelog.startedAt)))
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

  /**
   * Método encargado de detener la tarea en curso
   * @param {*} socket
   * @param {Object} payload
   */
  async stop (socket, payload) {
    let task
    let timelog
    try {
      ({ task, timelog } = await TaskService.stopTask(payload.id))
    } catch (error) {
      logger.error(red(error))
    }

    clearInterval(this.taskState.timerHandler)
    TaskEmitter.emitStoppedTask(socket, { task, timelog })
  }

  /**
   * Método encargado de finalizar la tarea en curso
   * @param {*} socket
   * @param {Object} payload
   */
  async finish (socket, payload) {
    let task
    let timelog
    try {
      ({ task, timelog } = await TaskService.finishTask(payload.id))
    } catch (error) {
      logger.error(red(error))
    }

    clearInterval(this.taskState.timerHandler)
    TaskEmitter.emitFinishedTask(socket, { task, timelog })
  }
}

const obj = new TaskListener()

export { obj as TaskListener }
