import { AddAccount } from '../../doamain/usecases/add-account'
import { MissingParamsError, InvalidParamError } from '../errors/'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  public handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      const { body } = httpRequest
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }

    return { body: {}, statusCode: 200 }
  }
}
