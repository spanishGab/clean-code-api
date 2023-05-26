import { MissingParamsError } from '../errors/missing-params-error'
import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  public handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamsError('email')
      }
    }

    return { body: {}, statusCode: 200 }
  }
}
