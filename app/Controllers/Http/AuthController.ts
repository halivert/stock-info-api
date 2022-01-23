import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/user'

export default class AuthController {
  public async register({ auth, request }: HttpContextContract) {
    const newUserSchema = schema.create({
      username: schema.string({ trim: true }),
      email: schema.string.optional({ trim: true, escape: true }),
      password: schema.string(),
    })

    const userData = await request.validate({ schema: newUserSchema })

    const user = await User.create({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })

    const token = await auth.use('api').attempt(userData.username, userData.password)

    return token
  }

  public async login({ auth, request }: HttpContextContract) {
    const loginSchema = schema.create({
      username: schema.string({ trim: true }),
      password: schema.string(),
    })

    const userData = await request.validate({ schema: loginSchema })

    try {
      const token = await auth.use('api').attempt(userData.username, userData.password)
      return token
    } catch (error) {
      return {
        error: 'Invalid username or password',
      }
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
}
