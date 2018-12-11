'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('lastname').notNullable()
      table.string('address').notNullable()
      table.string('company').defaultTo('None')
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
