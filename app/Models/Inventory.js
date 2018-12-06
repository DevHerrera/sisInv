'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inventory extends Model {
    static get table () {
        return 'inventory'
    }

    products () {
        return this.hasMany('App/Models/Product')
    }
}

module.exports = Inventory
