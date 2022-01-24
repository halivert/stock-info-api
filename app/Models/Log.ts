import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({
    serialize: (value: string) => JSON.parse(value),
  })
  public stockData: object

  @column({
    serialize: (value: string) => JSON.parse(value),
  })
  public userData?: object

  @column.dateTime({ autoCreate: true })
  public queriedAt: DateTime
}
