import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws'
import Message from 'App/Models/Message'

export default class MessagesController {
  public async index({}: HttpContextContract) {
    const messages = await Message.query().preload('user')

    return {
      messages,
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const message = await Message.create({
      userId: user.id,
      ...request.only(['text']),
    })

    await message.preload('user')

    const response = message.toJSON()

    Ws.io.emit('message', response)

    return response
  }
}
