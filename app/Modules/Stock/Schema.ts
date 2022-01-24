import { schema } from '@ioc:Adonis/Core/Validator'

export const store = schema.create({
  ticker: schema.string({ trim: true }),
  name: schema.string({ trim: true }),
  price: schema.number(),
  category: schema.string({ trim: true }),
})

export const update = schema.create({
  ticker: schema.string.optional({ trim: true }),
  name: schema.string.optional({ trim: true }),
  price: schema.number.optional(),
  category: schema.string.optional({ trim: true }),
})

export default { store, update }
