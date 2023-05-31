export * from '../../protocols'
export * from '../../../doamain/usecases/add-account'
export * from '../../../doamain/models/account'

export interface EmailValidator {
  isValid: (email: string) => boolean
}
