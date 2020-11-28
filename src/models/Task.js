/**
 * Definición del modelo Task
 */
import mongoose from 'mongoose'
import Moment from 'moment'

const schema = new mongoose.Schema({
  name: String,
  description: String,
  totalTime: Number,
  timeLeft: Number,
  priority: Number,
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
  inList: {
    type: Boolean,
    default: true
  },
  startedAt: Date,
  finishedAt: Date
}, {
  versionKey: false,
  timestamps: {
    currentTime: () => Moment(Moment.now(), 'x').toISOString()
  }
})

const model = mongoose.model('Task', schema)

export { model as Task }
