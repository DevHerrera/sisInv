'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseSchema extends Schema {
  up () {
    this.create('purchases', (table) => {
      table.increments()
      table.string('provider').notNullable().defaultTo('')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.double('total').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('purchases')
  }
}

module.exports = PurchaseSchema
