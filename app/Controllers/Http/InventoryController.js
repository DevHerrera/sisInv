'use strict'

const Inventory = use('App/Models/Inventory')
const Product = use('App/Models/Product')

class InventoryController {
    async index ({ view }) {
        const inventory = await Inventory.findOrFail(1)
        const productData = await inventory.products().fetch()
        const products = productData.toJSON()
        return view.render('inventory', { inventory: inventory, products: products })
    }

}

module.exports = InventoryController
