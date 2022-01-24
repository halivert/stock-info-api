import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from 'App/Models/Stock'
import Database from '@ioc:Adonis/Lucid/Database'
import { store as storeStockSchema } from 'App/Modules/Stock/Schema'
import pagination from 'App/Services/Pagination'

export default class StocksController {
  public async index({ request }: HttpContextContract) {
    const {
      next,
      prev,
      results: stocks,
    } = await pagination(request, Stock, 'stocks.index')

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
