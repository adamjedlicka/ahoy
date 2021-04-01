import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const validationSchema = schema.create({
      username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
      name: schema.string({ trim: true }),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })

    const user = await User.create(userDetails)

    return user.toJSON()
  }

  public async login({ request, auth }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')

    const token = await auth.attempt(username, password)

    return token.toJSON()
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
