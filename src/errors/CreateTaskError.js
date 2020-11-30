/**
 * Definición de excepción para cuando se produce un error al crear una Tarea
 */
class CreateTaskError extends Error {
  constructor (message) {
    super(message)

    this.name = 'CreateTaskError'
    this.code = 500
  }
}

export { CreateTaskError }
