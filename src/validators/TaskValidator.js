/**
 * Definición de clase validadora de endpoints de Tareas
 */
import Joi from 'joi'
import { Types } from 'mongoose'

class TaskValidator {
  /**
   * Método para validar el cuerpo de la petición al crear una Tarea
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  validateCreation (req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      totalTime: Joi.number().positive().required()
    })

    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: {
        wrap: {
          label: ''
        }
      }
    })

    if (error) {
      return res.status(400).json({ errors: error.details.map(({ message }) => ({ message })) })
    }

    next()
  }

  /**
   * Método para validar el cuerpo de la petición al actualizar una Tarea
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  validateUpdate (req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string(),
      description: Joi.string()
    })

    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: {
        wrap: {
          label: ''
        }
      }
    })

    if (error) {
      return res.status(400).json({ errors: error.details.map(({ message }) => ({ message })) })
    }

    next()
  }

  /**
   * Método para validar si el Id proporcionado es un ObjectId válido
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  validateId (req, res, next) {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ errors: [{ message: 'El Id proporcionado no es válido' }] })
    }

    next()
  }
}

const obj = new TaskValidator()

export { obj as TaskValidator }
