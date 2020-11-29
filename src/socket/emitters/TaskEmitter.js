/**
 * Defición de la clase emisora de eventos de Tareas
 */
class TaskEmitter {
  constructor () {
    this.events = {
      task: {
        started: 'task.started'
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
}

const obj = new TaskEmitter()

export { obj as TaskEmitter }
