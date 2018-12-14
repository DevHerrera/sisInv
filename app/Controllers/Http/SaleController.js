'use strict'

const Validator = use('App/Helpers/Validator')
const Sale = use('App/Models/Sale')
const Database = use('Database')

class SaleController {
  create ({ view }) {
    return view.render('sales.create')
  }

  async store ({ request, auth, view, response }) {
    await Validator.validateData(request.all(), Sale.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(402).send(Validator.getValidationMessage())
    }
    const sale = new Sale()
    sale.total = request.input('total')
    sale.client_id = request.input('client_id')
    sale.user_id = auth.user.id
    console.log('About to save SALE')
    await sale.save()
    const sales = await Sale.all()
    return view.render('sales.home', { sales: sales })
  }

  async home ({ view }) {
    const data = await Database.table('sales')
      .select('sales.id', 'users.username', 'clients.name', 'clients.lastname', 'sales.total')
      .innerJoin('clients', 'client_id', 'clients.id')
      .innerJoin('users', 'user_id', 1)
    return view.render('sales.home', { data })
  }
}

module.exports = SaleController
