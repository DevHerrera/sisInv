'use strict'

const Validator = use('App/Helpers/Validator')
const Client = use('App/Models/Client')

class ClientController {
  async index ({ view }) {
    const clientData = await Client.all()
    const clients = clientData.toJSON()
    return view.render('clients/home', { data: clients })
  }

  async showClients ({ view }) {
    const clients = Client.getClients()
    return view.render('clients/showModal', { data: clients })
  }

  create ({ view }) {
    return view.render('clients/create')
  }

  show ({ view }) {
    return view.render('clients/show')
  }

  async store ({ request, response }) {
    await Validator.validateData(request.all(), Client.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(402).send(Validator.getValidationMessage())
    }
    const client = new Client()
    client.name = request.input('name')
    client.lastname = request.input('lastname')
    client.address = request.input('address')
    client.company = request.input('company')
    await client.save()
    return response.redirect('/clients/')
  }

  async update ({ request, params, response }) {
    await Validator.validateData(request.all(), Client.getValidationRules())
    console.log(Validator.getValidationMessage())
    if (!Validator.isValidated()) {
      return response.status(402).send(Validator.getValidationMessage())
    }
    const client = await Client.find(params.id)
    client.name = request.input('name')
    client.lastname = request.input('lastname')
    client.address = request.input('address')
    client.company = request.input('company')
    await client.save()
    return response.redirect('/clients/')
  }

  async destroy ({ params, response }) {
    const client = await Client.findorFail(params.id)
    await client.delete()
    return response.route('clients')
  }
}

module.exports = ClientController
