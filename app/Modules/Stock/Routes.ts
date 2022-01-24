import Route from '@ioc:Adonis/Core/Route'
import Stock from 'App/Models/Stock'

Route.group(() => {
  Route.resource('stocks', 'StocksController')
    .apiOnly()
    .middleware({
      index: ['silentAuth'],
      show: ['silentAuth'],
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })
}).prefix('/v1')
