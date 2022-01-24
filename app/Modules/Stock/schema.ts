import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const store = schema.create({
  ticker: schema.string({ trim: true }),
  name: schema.string({ trim: true }),
  price: schema.number(),
  category: schema.string({ trim: true }),
})
