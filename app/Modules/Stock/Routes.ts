import Route from '@ioc:Adonis/Core/Route'
import Stock from 'App/Models/Stock'

Route.group(() => {
  Route.get('/stocks', 'StocksController.index').as('stocks.index')
  Route.get('/stocks/:id', 'StocksController.show')
    .where('id', Route.matchers.number())
    .as('stocks.show')

  Route.group(() => {
    Route.post('/stocks', 'StocksController.store').as('stocks.store')
    Route.patch('/stocks/:id', 'StocksController.update')
      .where('id', Route.matchers.number())
      .as('stocks.update')

    Route.delete('/stocks/:id', 'StocksController.destroy')
  }).middleware(['auth'])
}).prefix('/v1')
