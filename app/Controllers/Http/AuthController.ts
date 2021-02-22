import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })

    const user = await User.create(userDetails)

    return user.toJSON()
  }

  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)

    return token.toJSON()
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
  }
}
