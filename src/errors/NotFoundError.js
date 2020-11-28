/**
 * Definición de excepción para cuando no se encuentra un recurso
 */
class NotFoundError extends Error {
  constructor (message) {
    super(message)

    this.name = 'NotFoundError'
    this.code = 404
  }
}

export { NotFoundError }
