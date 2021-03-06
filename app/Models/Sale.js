'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  static getValidationRules () {
    const rules = {
      client_id: 'required',
      total: 'required'
    }
    return rules
  }
}

module.exports = Sale
