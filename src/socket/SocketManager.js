/**
 * Definición de clase manejadora del websocket
 */
import { TaskListener } from './listeners'

const SocketManager = server => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', socket => TaskListener.connection(socket))
}

export { SocketManager }
