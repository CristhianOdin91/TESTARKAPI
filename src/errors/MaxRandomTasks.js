/**
 * Definición de excepción para cuando se alcanza el número máximo de Tareas aleatorias creadas
 */
class MaxRandomTasks extends Error {
  constructor (message) {
    super(message)

    this.name = 'MaxRandomTasks'
    this.code = 409
  }
}

export { MaxRandomTasks }
