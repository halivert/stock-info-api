import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.group(() => {
  Route.post('/register', 'AuthController.register').as('auth.register')
  Route.post('/login', 'AuthController.login').as('auth.login')

  Route.group(() => {
    Route.post('/logout', 'AuthController.logout').as('auth.logout')

    Route.get('/me', async ({ auth }: HttpContextContract) => {
      return auth.user
    }).as('auth.me')

    Route.resource('users', 'UsersController').apiOnly()
  }).middleware(['auth'])
}).prefix('/v1')
