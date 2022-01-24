import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from 'App/Models/Stock'
import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'
import { store as storeStockSchema } from 'App/Modules/Stock/schema'

export default class StocksController {
  public async index({ request }: HttpContextContract) {
    const params = request.qs()
    const offset = Number(params?.offset || 0)
    const limit = Number(params?.limit || 10)

    const stocks = await Stock.query().limit(limit).offset(offset)

    const next = stocks.length === limit ? Route.makeUrl('stocks.index', {
      qs: {
        offset: offset + limit,
        limit: limit,
      },
    }) : null

    const prev = offset - limit >= 0 ? Route.makeUrl('stocks.index', {
      qs: {
        offset: offset - limit,
        limit: limit,
      },
    }) : null

    return { next, prev, stocks }
  }

  public async store({ bouncer, request }: HttpContextContract) {
    await bouncer.with('StockPolicy').authorize('create')
    const stockData = await request.validate({ schema: storeStockSchema })
    const stock = await Stock.create(stockData)
    return stock
  }

  public async show({ request, params }: HttpContextContract) {
    const stock = await Stock.findOrFail(params.id)
    return stock
  }

  public async update({ bouncer, request }: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
