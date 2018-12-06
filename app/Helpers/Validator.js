'use strict'

const { validate } = use('Validator')

class Validator {

    static isValidated () {
        return Validator.sucess
    }

    static getValidationMessage () {
        return Validator.message
    }
    static async validateData (data, rules) {
        const validation = await validate(data, rules)
        if (validation.fails()){
            Validator.sucess = false
            Validator.message = validation.messages()
            return
        }
        Validator.sucess = true
        return
    }
}

module.exports = Validator