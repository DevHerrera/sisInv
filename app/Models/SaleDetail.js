'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SaleDetail extends Model {

  products () {
    return this.hasMany('App/Models/Product')
  }

  sales () {
    return this.hasMany('App/Models/Sale')
  }
  
}

module.exports = SaleDetail
