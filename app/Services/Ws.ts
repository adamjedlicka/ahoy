import socketIo from 'socket.io'
import Server from '@ioc:Adonis/Core/Server'

class Ws {
  public isReady = false
  public io: socketIo.Server

  public start() {
    this.io = (socketIo as any)(Server.instance!)
    this.isReady = true
  }
}

/**
 * This makes our service a singleton
 */
export default new Ws()
