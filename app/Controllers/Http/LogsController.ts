import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import pagination from 'App/Services/Pagination'

export default class LogsController {
  public async index ({ bouncer, auth, request }: HttpContextContract) {
    await bouncer.with('LogPolicy').authorize('viewList')
    const {
      next,
      prev,
      results: logs,
    } = await pagination(request, Log, 'logs.index')

    return { next, prev, logs }
  }

  public async show ({ params, bouncer, auth }: HttpContextContract) {
    const log = await Log.findOrFail(params.id)
    await bouncer.with('LogPolicy').authorize('view', log)
    return log
  }
}
