/**
 * Definición del modelo Task
 */
import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import Moment from 'moment'

autoIncrement.initialize(mongoose.connection)

const schema = new mongoose.Schema({
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

schema.plugin(autoIncrement.plugin, { model: 'Task', field: 'priority', startAt: 1, unique: false })

const model = mongoose.model('Task', schema)

export { model as Task }
