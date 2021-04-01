import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {
  public async index({}: HttpContextContract) {
    const messages = await Message.all()

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

    return message.toJSON()
  }
}
