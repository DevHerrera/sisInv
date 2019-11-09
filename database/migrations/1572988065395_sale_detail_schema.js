'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleDetailSchema extends Schema {
  up () {
    this.create('sale_details', (table) => {
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity').notNullable()
      table.double('subtotal')
      table.integer('sale_id').unsigned().references('id').inTable('sales')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('sale_details')
  }
}

module.exports = SaleDetailSchema
