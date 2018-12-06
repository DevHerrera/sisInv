'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('master')

Route.get('/inventory/:inventoryId/', 'InventoryController.index').as('inventory')
Route.get('/inventory/:inventoryId/products/:productId/', 'ProductController.show')
Route.post('/inventory/:inventoryId/products/:productId/', 'ProductController.update')