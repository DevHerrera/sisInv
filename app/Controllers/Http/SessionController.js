'use strict'

const User = use('App/Models/User')

const Validator = use('App/Helpers/Validator')

class SessionController {

  create ({ view }) {
    return view.render('login')
  }


  async register ({ request, response }) {
    await Validator.validateData(request.all(), User.getValidationRules())
    if (!Validator.isValidated()) {
      return response.status(422).send(Validator.getValidationMessage())
    }
    let user = new User()
    user.email = request.input('email')
    user.password = request.input('password')
    user.username = request.input('username')
    await user.save()
    return response.status(200).send(user)
  }

  async store ({ auth, request, response, session }) {
    const { username, password } = request.all()
    try {
      await auth.attempt(username, password)
    } catch (e) {
      session.flashExcept(['password'])
      session.flash({ error: 'Credenciales Incorrectos' })
      return response.redirect('/')
    }

    return response.redirect('/inventory')
  }

  async delete ({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = SessionController
