import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rooms extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('owner_id').notNullable()
      table.timestamps(true)

      table.foreign('owner_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
