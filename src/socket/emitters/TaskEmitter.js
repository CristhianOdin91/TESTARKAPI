/**
 * Defición de la clase emisora de eventos de Tareas
 */
class TaskEmitter {
  constructor () {
    this.events = {
      task: {
        started: 'task.started',
        status: 'task.status',
        paused: 'task.paused',
        stopped: 'task.stopped',
        finished: 'task.finished'
      }
    }
  }

  /**
   * Método encargado de emitir la respuesta a la tarea recién inicializada
   * @param {*} socket
   * @param {Object} payload
   */
  emitStartedTask (socket, payload) {
    socket.emit(this.events.task.started, payload)
  }

  /**
   * Método encargado de emitir el estatus de la tarea recién inicializada
   * @param {*} socket
   * @param {Object} payload
   */
  emitTaskStatus (socket, payload) {
    socket.emit(this.events.task.status, payload)
  }

  /**
   * Método encargado de emitir la respuesta a la tarea recién pausada
   * @param {*} socket
   * @param {Object} payload
   */
  emitPausedTask (socket, payload) {
    socket.emit(this.events.task.paused, payload)
  }

  /**
   * Método encargado de emitir la respuesta a la tarea recién pausada
   * @param {*} socket
   * @param {Object} payload
   */
  emitStoppedTask (socket, payload) {
    socket.emit(this.events.task.stopped, payload)
  }

  /**
   * Método encargado de emitir la respuesta a la tarea recién finalizada
   * @param {*} socket
   * @param {Object} payload
   */
  emitFinishedTask (socket, payload) {
    socket.emit(this.events.task.finished, payload)
  }
}

const obj = new TaskEmitter()

export { obj as TaskEmitter }
