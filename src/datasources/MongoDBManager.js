import mongoose from 'mongoose'

class MongoDBManager {
  constructor () {
    this.host = process.env.MONGO_HOST
    this.dataBase = process.env.MONGO_DB
    this.user = process.env.MONGO_USER || ''
    this.password = process.env.MONGO_PASSWORD || ''
    this.port = process.env.MONGO_PORT || '27017'

    const hasUserAndPassword = (this.user && this.password)

    this.uri = process.env.MONGO_URI
      ? process.env.MONGO_URI
      : `mongodb://${this.user}${
        hasUserAndPassword ? ':' : ''
        }${this.password}${
          this.user ? '@' : ''
        }${this.host}:${this.port}/${this.dataBase}${
          hasUserAndPassword ? '?authSource=admin' : ''
        }`
  }

  init () {
    mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

const DBManager = new MongoDBManager()
DBManager.init()

export { DBManager }
