'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.double('total').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
