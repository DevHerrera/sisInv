'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {      
      table.increments()
      table.string('name', 50)
      table.string('description', 160)
      table.double('purchasePrice').notNullable().defaultTo(0)
      table.double('salePrice').notNullable().defaultTo(0)
      table.integer('inStock').notNullable().defaultTo(0)
      table.timestamps()
      // Relationships
      table.integer('inventory_id').unsigned().references('id').inTable('inventory')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
