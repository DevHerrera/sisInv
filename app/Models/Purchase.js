'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Purchase extends Model {
  static getValidationRules () {
    const rules = {
      provider: 'required',
      total: 'required'
    }
    return rules
  }
}

module.exports = Purchase
