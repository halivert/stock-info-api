import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const store = schema.create({
  name: schema.string({ trim: true }),
  username: schema.string({ trim: true }),
  email: schema.string.optional({ trim: true, escape: true }, [rules.email()]),
  password: schema.string(),
})

export const update = schema.create({
  name: schema.string({ trim: true }),
  username: schema.string.optional({ trim: true }),
  email: schema.string.optional({ trim: true, escape: true }, [rules.email()]),
  isAdmin: schema.boolean.optional(),
})

export const login = schema.create({
  username: schema.string({ trim: true }),
  password: schema.string(),
})

export default { store, update, login }
