'use strict'

const Inventory = use('App/Models/Inventory')

class InventoryController {
  async index ({ view }) {
    const inventory = await Inventory.findOrFail(1)
    const productData = await inventory.products().fetch()
    const products = productData.toJSON()
    return view.render('inventory', { inventory: inventory, products: products })
  }
}

module.exports = InventoryController
