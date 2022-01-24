import Route from '@ioc:Adonis/Core/Route'
import Stock from 'App/Models/Stock'

Route.group(() => {
  Route.resource('stocks', 'StocksController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })

  Route.group(() => {}).middleware(['auth'])
}).prefix('/v1')
