'use strict'

const Validator = use('App/Helpers/Validator')
const Purchase = use('App/Models/Purchase')
const Product = use('App/Models/Product')

class PurchaseController {
  async home ({ request, view }) {
    const purchasesData = await Purchase.all()
    const data = purchasesData.toJSON()
    return view.render('purchases.home', { data: data })
  }

  async create ({ view }) {
    const product = await Product.all()
    return view.render('purchases.create', { products: product.toJSON(), isSale: false })
  }

  async storeNew ({ request, auth, response }) {
    await Validator.validateData(request.all(), Product.getValidationRules())
    if (!Validator.isValidated()) {
      return response.send(Validator.getValidationMessage())
    }
    const product = new Product()
    product.name = request.input('name')
    product.description = request.input('description')
    product.inStock = request.input('inStock')
    product.salePrice = request.input('salePrice')
    product.purchasePrice = request.input('purchasePrice')
    product.inventory_id = 1
    await product.save()
    const purchase = new Purchase()
    purchase.total = product.purchasePrice * product.inStock
    purchase.provider = request.input('provider')
    purchase.user_id = auth.id
    await purchase.save()
    return response.route('purchases')
  }

  async store ({ request, auth, response }) {
    await Validator.validateData(request.all(), Purchase.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(402).send(Validator.getValidationMessage())
    }
    const update = JSON.parse(request.input('rest'))
    const productsData = await Product.all()
    const products = productsData.toJSON()
    for (let i = 0; i < update.length; i++) {
      if (update[i] !== 0) {
        const product = await Product.find(products[i].id)
        let rest = product.inStock + update[i]
        product.inStock = rest
        product.save()
      }
    }
    const purchase = new Purchase()
    purchase.total = request.input('total')
    purchase.provider = request.input('provider')
    purchase.user_id = auth.id
    await purchase.save()
    return response.route('purchases')
  }
}

module.exports = PurchaseController
