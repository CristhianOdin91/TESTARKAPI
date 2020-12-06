/**
 * Definición del modelo Task
 */
import mongoose, { Schema } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

import { getCurrentTime } from '../utils'

autoIncrement.initialize(mongoose.connection)

const schema = new Schema({
  name: String,
  description: String,
  totalTime: Number,
  timeLeft: Number,
  active: {
    type: Boolean,
    default: false
  },
  paused: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  },
  erased: {
    type: Boolean,
    default: false
  },
  startedAt: Date,
  finishedAt: Date,
  timelogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Timelog'
    }
  ]
}, {
  versionKey: false,
  timestamps: {
    currentTime: () => getCurrentTime().format()
  }
})

schema.plugin(autoIncrement.plugin, { model: 'Task', field: 'priority', startAt: 1, unique: false })

const model = mongoose.model('Task', schema)

export { model as Task }
