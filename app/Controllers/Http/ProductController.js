'use strict'

const Product = use('App/Models/Product')
const Inventory = use('App/Models/Inventory')
const Validator = use('App/Helpers/Validator')
const { validate } = use('Validator')

class ProductController {
    async show ({ request, params, view }) {
        const inventory = await Inventory.findOrFail(params.inventoryId)
        const productData = await inventory.products().where('id', params.productId).fetch()
        const product = productData.toJSON()[0]
        return view.render('products.productdetails', { product: product })
    }

    create ({ request, view }) {
        return view.render('products.newproduct')
    }

    saludar ({params}) {
        console.log(params.nombre)
    }
    async delete ({ request, params, response }) {
        const product = await Product.find(params.productId)
        await product.delete()
        return response.route('inventory', { inventoryId: 1 })        
    }

    async store ({ request, params, response, view }) {
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
        product.inventory_id = params.inventoryId
        await product.save()
        return response.route('inventory', { inventoryId: 1 })
    }

    async update ({ request, params, response, view }) {
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
        product.inventory_id = params.inventoryId
        await product.save()        
        return response.route('inventory', { inventoryId: 1 })
    }
}

module.exports = ProductController
