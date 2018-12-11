'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
    static getValidationRules () {
        const rules = {
            name: 'required',
            lasntname: 'required',
            address: 'required',
            company: 'required'
        }
    }
    compras () {
        return this.hasMany('App/Model/Sale')
    }
}

module.exports = Client
