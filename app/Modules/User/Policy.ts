import { BasePolicy, deny } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async viewList(user: User) {
    return user.isAdmin ? true : deny('You are not an admin')
  }

  public async view(user: User, model: User) {
    return user.isAdmin ? true : deny('You are not an admin')
  }

  public async create(user: User) {
    return user.isAdmin ? true : deny('You are not an admin')
  }

  public async update(user: User, model: User) {
    return user.isAdmin ? true : deny('You are not an admin')
  }

  public async delete(user: User, model: User) {
    if (user.id === model.id) {
      return deny('You cannot delete yourself')
    }

    return user.isAdmin ? true : deny('You are not an admin')
  }
}
