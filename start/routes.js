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

// Product Create

/*
 |----------------------------------
 | Product Controller Routes
 |----------------------------------
 */

Route.group(() => {
    Route.get('/products/create', 'ProductController.create')
    Route.get('/products/:productId/delete', 'ProductController.delete')
    Route.get('/products/:productId', 'ProductController.show')
    Route.post('/products/:productId', 'ProductController.update')
    Route.post('/products/', 'ProductController.store')
}).prefix('/inventory/:inventoryId')