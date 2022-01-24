import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Log from 'App/Models/Log'

export default class LogPolicy extends BasePolicy {
  public async viewList(user: User) {
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }

  public async view(user: User, log: Log) {
    if (!log.id) return Bouncer.deny('Log not found')
    return user.isAdmin ? true : Bouncer.deny('You are not an admin')
  }
}
