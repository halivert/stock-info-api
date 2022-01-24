import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from 'App/Models/Stock'
import Schema from 'App/Modules/Stock/Schema'
import pagination from 'App/Services/Pagination'
import Log from 'App/Models/Log'

export default class StocksController {
  public async index({ request, auth }: HttpContextContract) {
    const {
      next,
      prev,
      results: stocks,
    } = await pagination(request, Stock, 'stocks.index')

    await Log.create({
      stockData: JSON.stringify(stocks.map((s) => s.serialize())),
      userData: JSON.stringify(auth.user?.serialize() || null),
    })

    return { next, prev, stocks }
  }

  public async show({ params, auth }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id)

    await Log.create({
      stockData: JSON.stringify(stock.serialize()),
      userData: JSON.stringify(auth.user?.serialize() || null),
    })

    return stock
  }

  public async store({ bouncer, request }: HttpContextContract) {
    await bouncer.with('StockPolicy').authorize('create')
    const data = await request.validate({ schema: Schema.store })
    const stock = await Stock.create(data)
    return stock
  }

  public async update({ bouncer, request, params }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id)
    await bouncer.with('StockPolicy').authorize('update', stock)
    const data = await request.validate({ schema: Schema.update })
    stock.merge(data)
    await stock.save()
    return stock
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id)
    await bouncer.with('StockPolicy').authorize('delete', stock)
    await stock.delete()
    return response.noContent()
  }
}
