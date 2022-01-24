import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async viewList(user: User) {
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async view(user: User, model: User) {
    if (!model.id) return Bouncer.deny('User does not exist')
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async create(user: User) {
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async update(user: User, model: User) {
    if (!model.id) return Bouncer.deny('User does not exist')
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async delete(user: User, model: User) {
    if (user.id === model.id) {
      return Bouncer.deny('You cannot delete yourself')
    }

    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }
}
