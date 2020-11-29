/**
 * Definición de la clase manejadora de eventos relacionados con las Tareas
 */
import { magenta } from 'chalk'
import logger from '../../../config/logger'

class TaskListener {
  /**
   * Método encargado de gestionar la conexión al socket
   * @param {*} socket
   */
  connection (socket) {
    logger.info(magenta(`Usuario conectado al websocket con ID ${socket.id}`))

    socket.on('disconnect', () => this.disconnect(socket))
  }

  /**
   * Método encargado de gestionar la desconexión al socket
   * @param {*} socket
   */
  disconnect (socket) {
    logger.info(magenta(`El usuario con ID ${socket.id} ha sido desconectado`))
  }
}

const obj = new TaskListener()

export { obj as TaskListener }
