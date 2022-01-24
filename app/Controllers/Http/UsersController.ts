import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import paginate from 'App/Services/Pagination'

export default class UsersController {
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    const {
      next,
      prev,
      results: users,
    } = await paginate(request, User, 'users.index')

    return { next, prev, users }
  }

  public async show({ params, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('view', user)
    return user
  }

  public async store({ request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('create')
  }

  public async update({ params, request, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('update', user)
    const data = request.only(['name', 'email', 'username', 'is_admin'])
    user.merge(data)
    await user.save()
    return user
  }

  public async destroy({ params, bouncer, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('delete', user)
    await user.delete()
    return response.status(204)
  }
}
