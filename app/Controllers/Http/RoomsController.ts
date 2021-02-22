import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async index() {
    const rooms = await Room.all()

    return rooms
  }

  public async create({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()

    const room = Room.create({
      ownerId: user.id,
      ...request.only(['name']),
    })

    return room
  }
}
