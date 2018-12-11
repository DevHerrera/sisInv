'use strict'

class RedirectIfAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request, response }, next) {
    try {
      await auth.check()
      return response.redirect('/inventory')
    } catch (e) {}
    await next()
  }
}

module.exports = RedirectIfAuthenticated
