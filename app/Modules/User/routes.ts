import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'AuthController.register').as('auth.register')
Route.post('/login', 'AuthController.login').as('auth.login')

Route.group(() => {
  Route.post('/logout', 'AuthController.logout').as('auth.logout')
}).middleware(['auth'])
