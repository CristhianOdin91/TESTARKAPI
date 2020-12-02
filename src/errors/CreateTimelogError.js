/**
 * Definición de excepción para cuando se produce un error al crear un Registro de Tiempo
 */
class CreateTimelogError extends Error {
  constructor (message) {
    super(message)

    this.name = 'CreateTimelogError'
    this.code = 500
  }
}

export { CreateTimelogError }
