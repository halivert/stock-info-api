import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ticker: string

  @column()
  public name: string

  @column({
    prepare: (value: number) => Math.round(value * 100),
    consume: (value: number) => value / 100,
  })
  public price: number

  @column()
  public category: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
