import Route from '@ioc:Adonis/Core/Route'

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
