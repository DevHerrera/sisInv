'use strict'

const Product = use('App/Models/Product')
const Inventory = use('App/Models/Inventory')
const Validator = use('App/Helpers/Validator')

class ProductController {
  async show ({ params, view }) {
    const inventory = await Inventory.findOrFail(1)
    const productData = await inventory.products().where('id', params.productId).fetch()
    const product = productData.toJSON()[0]
    return view.render('products.productdetails', { product: product })
  }

  create ({ view }) {
    return view.render('products.newproduct')
  }

  async delete ({ params, response }) {
    const product = await Product.findOrFail(params.productId)
    await product.delete()
    return response.route('inventory', { inventoryId: 1 })
  }

  async newProduct ({ request, response }) {
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
    await product.save()
  }

  async store ({ request, response }) {
    console.log('? RLY')
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
    return response.route('inventory', { inventoryId: 1 })
  }

  async update ({ request, params, response }) {
    // Validar Campos
    await Validator.validateData(request.all(), Product.getValidationRules())
    // If Validation fails redirect to inventory
    if (!Validator.isValidated()) {
      return response.send(Validator.getValidationMessage())
    }
    const product = await Product.findOrFail(params.productId)
    // Product's Fields
    product.name = request.input('name')
    product.description = request.input('description')
    product.inStock = request.input('inStock')
    product.salePrice = request.input('salePrice')
    product.purchasePrice = request.input('purchasePrice')
    product.inventory_id = 1
    await product.save()
    return response.route('inventory', { inventoryId: 1 })
  }
}

module.exports = ProductController
