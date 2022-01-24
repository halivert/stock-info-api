import User from 'App/Models/User'
import Stock from 'App/Models/Stock'
import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'

export default class StockPolicy extends BasePolicy {
  public async create(user: User) {
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async update(user: User, stock: Stock) {
    if (!stock.id) return Bouncer.deny('Stock does not exist')
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async delete(user: User, stock: Stock) {
    if (!stock.id) return Bouncer.deny('Stock does not exist')
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }
}
