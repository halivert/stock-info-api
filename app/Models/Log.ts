import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({
    serialize: (value: string) => JSON.parse(value),
  })
  public stockData: string

  @column({
    serialize: (value: string) => JSON.parse(value),
  })
  public userData?: string

  @column.dateTime({ autoCreate: true })
  public queriedAt: DateTime
}
