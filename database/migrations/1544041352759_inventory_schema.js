'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventory', (table) => {
      table.increments()
      table.string('description', 250)
      table.string('name', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('inventory')
  }
}

module.exports = InventorySchema
