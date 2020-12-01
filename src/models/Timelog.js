/**
 * Definición del modelo Timelog
 */
import mongoose, { Schema } from 'mongoose'
import Moment from 'moment-timezone'

const schema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task'
  },
  startedAt: Date,
  finishedAt: Date,
  elapsedTime: Number
}, {
  versionKey: false,
  timestamps: {
    currentTime: () => Moment().tz('America/Mexico_City').format()
  }
})

const model = mongoose.model('Timelog', schema)

export { model as Timelog }
