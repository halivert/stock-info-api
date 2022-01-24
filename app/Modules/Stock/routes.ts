import Route from '@ioc:Adonis/Core/Route'
import Stock from 'App/Models/Stock'

Route.group(() => {
  Route.get('/stocks', 'StocksController.index').as('stocks.index')
  Route.get('/stocks/:id', 'StocksController.show')
    .where('id', Route.matchers.number())
    .as('stocks.show')

  Route.group(() => {
    Route.post('/stocks', 'StocksController.store').as('stocks.store')
  }).middleware(['auth'])
}).prefix('/v1')
