'use strict'

class SessionController {
  create ({ view }) {
    return view.render('login')
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
