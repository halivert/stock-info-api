import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Schema from 'App/Modules/User/Schema'

export default class AuthController {
  public async register({ auth, request }: HttpContextContract) {
    const data = await request.validate({ schema: Schema.store })
    await User.create(data)
    return await auth.use('api').attempt(data.username, data.password)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const data = await request.validate({ schema: Schema.login })

    try {
      const token = await auth.use('api').attempt(data.username, data.password)
      return token
    } catch (error) {
      return response
        .status(401)
        .send({ error: 'Invalid username or password' })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }
}
