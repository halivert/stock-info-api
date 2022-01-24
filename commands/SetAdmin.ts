import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'

export default class SetAdmin extends BaseCommand {
  public static commandName = 'set:admin'

  public static description = 'Set an user as admin with the given username'

  @flags.boolean({ description: 'Unset admin status' })
  public unset: boolean

  @args.string({ description: 'Username of the user to promote to admin' })
  public username: string

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')
    const username = this.username.toLowerCase()
    const user = await User.findBy('username', username)
    if (!user) return this.logger.error(`User ${username} not found`)
    await user.merge({ isAdmin: this.unset !== true }).save()

    if (this.unset) {
      return this.logger.info(`User ${username} is now a normal user`)
    }

    this.logger.info(`User ${username} is now an admin`)
  }
}
