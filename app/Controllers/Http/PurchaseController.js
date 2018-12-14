'use strict'

const Validator = use('App/Helpers/Validator')
const Purchase = use('App/Models/Purchase')

class PurchaseController {
  async home ({ request, view }) {
    const purchasesData = await Purchase.all()
    const data = purchasesData.toJSON()
    return view.render('purchases.home', { data: data })
  }

  create ({ view }) {
    return view.render('purchases.create')
  }

  async store ({ request, auth, view, response }) {
    await Validator.validateData(request.all(), Purchase.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(402).send(Validator.getValidationMessage())
    }
    const purchase = new Purchase()
    purchase.total = request.input('total')
    purchase.provider = request.input('provider')
    purchase.user_id = auth.id
    await purchase.save()
    const purchases = await Purchase.all()
    return view.render('purchases.home', { data: purchases })
  }
}

module.exports = PurchaseController
