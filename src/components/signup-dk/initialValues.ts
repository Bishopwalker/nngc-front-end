import {ValidationSchema} from './Context'

export const initialValues: ValidationSchema = {
  firstName: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20,
    helperText: 'Custom error message'
  },
  lastName: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20
  },
  email: {
    value: '',
    error: '',
    required: true,
    validate: 'email'
  },
  password: {
    value: '',
    error: '',
    required: true,
    validate: 'password'
  },
  county: {
    value: '',
    error: '',
    required: true,
    validate: 'select'
  },
  date: {
    value: '',
    error: ''
  },
  city: {
    value: '',
    error: '',
    validate: 'text',
    required: true,
  },
  houseNumber: {
    value: '',
    error: '',
    required: true,
  },
  streetName: {
    value: '',
    error: '',
    validate: 'text',
    required: true,
  },
  state: {
    value: '',
    error: '',
    validate: 'state',
    required: true,
    minLength: 2,
    maxLength: 2
  },
  agreenemt: {
    value: false,
    error: '',
    required: true,
    validate: 'checkbox',
    helperText: 'Please accept our terms and conditions'
  },
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    required: true,
    maxLength: 15
  },
  zipCode: {
    value: '',
    error: '',
    validate: 'zip',
    required: true,
    maxLength: 5
  }
}
