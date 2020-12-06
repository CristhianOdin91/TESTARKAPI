/**
 * Definición del modelo Timelog
 */
import mongoose, { Schema } from 'mongoose'

import { getCurrentTime } from '../utils'

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
    currentTime: () => getCurrentTime().format()
  }
})

const model = mongoose.model('Timelog', schema)

export { model as Timelog }
