'use strict'

const Validator = use('App/Helpers/Validator')
const Sale = use('App/Models/Sale')
const Database = use('Database')
const Client = use('App/Models/Client')
const Product = use('App/Models/Product')

class SaleController {
  async create ({ view }) {
    const clients = await Client.all()
    const products = await Product.all()
    return view.render('sales.create', { clients: clients.toJSON(), products: products.toJSON(), isSale: true })
  }

  async store ({ request, auth, view, response }) {
    await Validator.validateData(request.all(), Sale.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(402).send(Validator.getValidationMessage())
    }
    const update = JSON.parse(request.input('rest'))
    const productsData = await Product.all()
    const products = productsData.toJSON()
    for (let i = 0; i < products.length; i++) {
      const product = await Product.find(products[i].id)
      let rest = product.inStock - update[i]
      product.inStock = rest
      product.save()
    }
    const sale = new Sale()
    sale.total = request.input('total')
    sale.client_id = request.input('client_id')
    sale.user_id = auth.user.id
    await sale.save()
    return response.route('sales')
  }

  async home ({ view }) {
    const data = await Database.table('sales')
      .select('sales.id', 'sales.created_at', 'clients.id', 'users.username', 'clients.name', 'clients.lastname', 'sales.total')
      .innerJoin('clients', 'client_id', 'clients.id')
      .innerJoin('users', 'user_id', 1)
    const products = await Product.all()
    data.forEach(sale => {
      const date = new Date(sale.created_at)
      const createdAt = '' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
      sale.created_at = createdAt
    })
    return view.render('sales.home', { data: data, products: products.toJSON() })
  }
}

module.exports = SaleController
