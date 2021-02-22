import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async me({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }
}
