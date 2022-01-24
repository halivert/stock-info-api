import User from 'App/Models/User'
import Stock from 'App/Models/Stock'
import { BasePolicy, deny } from '@ioc:Adonis/Addons/Bouncer'

export default class StockPolicy extends BasePolicy {
  public async create(user: User) {
    return user.isAdmin ? true : deny("You're not an admin")
  }
}
