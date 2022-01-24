import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('logs', 'LogsController').apiOnly().only(['index', 'show'])
})
  .prefix('/v1')
  .middleware(['auth'])
