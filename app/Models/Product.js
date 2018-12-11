'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static getValidationRules () {
    const rules = {
      name: 'required',
      description: 'required',
      inStock: 'required',
      salePrice: 'required',
      purchasePrice: 'required'
    }
    return rules
  }
}

module.exports = Product
