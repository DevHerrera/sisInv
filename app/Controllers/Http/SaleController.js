'use strict'

const Validator = use('App/Helpers/Validator')

const Database = use('Database')

const SaleDetail = use('App/Models/SaleDetail')
const Sale = use('App/Models/Sale')
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
    const sale = new Sale()
    sale.total = request.input('total')
    sale.client_id = request.input('client_id')
    sale.user_id = auth.user.id
    await sale.save()

    const soldStocks = JSON.parse(request.input('rest'))
    const productsData = await Product.all()
    const products = productsData.toJSON()
    for (let i = 0; i < products.length; i++) {
      const product = await Product.find(products[i].id)
      let soldStock = soldStocks[i]
      product.inStock -= soldStock
      product.save()
      let saleDetail = new SaleDetail()
      saleDetail.sale_id = sale.id
      saleDetail.product_id = product.id
      saleDetail.quantity = soldStocks[i]
      saleDetail.subtotal = soldStock * product.salePrice
      saleDetail.save()
    }
    return response.route('sales')
  }

  async home ({ view, auth }) {
    const data = await Database.table('sales')
      .select('sales.id', 'sales.created_at',
      'clients.id', 'clients.name',
      'clients.lastname', 'sales.total')
      .innerJoin('clients', 'client_id', 'clients.id')
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
