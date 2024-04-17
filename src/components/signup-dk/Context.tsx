import React, {createContext, useCallback, useMemo, useReducer, useState} from 'react'
import {initialValues} from './initialValues'

const isText = /^[A-Z ]+$/i
const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const isPhone = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/ // us
const isZip = /^[0-9]{5}([- /]?[0-9]{4})?$/ // us
const isNumber = /^\d+$/
const isValidPassword = /^.{8,}$/
const isValidZip = /^\d{5}$/
const isValidState = /^va$|^VA$/

// Applied to all fields

type Variant = 'outlined' | 'standard' | 'filled'
type Margin = 'dense' | 'normal' | 'none'

const variant: Variant = 'standard'
const margin: Margin = 'normal'

export declare type ValidationSchema = Record<
  string,
  {
    value?: any
    error?: string
    required?: boolean
    validate?: 'text' | 'number' | 'email' | 'phone' | 'zip' | 'checkbox' | 'select' | 'password'| 'state'| 'service'
    minLength?: number
    maxLength?: number
    helperText?: string
  }
>

type ContextProps = {
  activeStep: number
  formValues: ValidationSchema
  // eslint-disable-next-line no-unused-vars
    handleChange(event: { target: { name: string; value: string } }, checked?: boolean): void
  handleNext(): void
  handleBack(): void
  variant: Variant
  margin: Margin,
    warning: string,
    setWarning: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<ContextProps>({
  activeStep: 0,
  formValues: initialValues,
  handleChange() {},
  handleNext() {},
  handleBack() {},
  variant,
  margin,
  warning:'',
    setWarning:()=>{}
})

interface ProviderProps {
  children: React.ReactNode
}

type State = {
  activeStep: number
  formValues: ValidationSchema
}
type Action =
  | { type: 'increase' }
  | { type: 'decrease' }
  | { type: 'form-value'; name: string; fieldValue: any }
  | { type: 'form-error'; name: string; error: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        activeStep: state.activeStep + 1
      }
    case 'decrease':
      return {
        ...state,
        activeStep: state.activeStep - 1
      }
    case 'form-value':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            value: action.fieldValue
          }
        }
      }
    case 'form-error':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            error: action.error
          }
        }
      }

    default:
      return state
  }
}

export function StepsProvider({ children }: ProviderProps) {
  const [{ activeStep, formValues }, dispatch] = useReducer(reducer, {
    activeStep: 0,
    formValues: initialValues
  })
  const [warning, setWarning] = useState('');
  // Proceed to next step
  const handleNext = useCallback(() => dispatch({ type: 'increase' }), [])
  // Go back to prev step
  const handleBack = useCallback(() => dispatch({ type: 'decrease' }), [])

  // Handle form change
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => {
            const { type, name, value } = event.target

            // Provide a fallback value (false) if checked is undefined
            const fieldValue = type === 'checkbox' ? checked || false : value

            dispatch({ type: 'form-value', name, fieldValue })


            const fieldName = initialValues[name]
      if (!fieldName) return

      const { required, validate, minLength, maxLength, helperText } = fieldName

      let error = ''

      if (required && !fieldValue) error = 'This field is required'
      if (minLength && value && value.length < minLength) error = `Minimum ${minLength} characters is required.`
      if (maxLength && value && value.length > maxLength) error = 'Maximum length exceeded!'
      if (validate) {
        switch (validate) {
          case 'text':
            if (value && !isText.test(value)) error = helperText || 'This field accepts text only.'
            break

          case 'number':
            if (value && !isNumber.test(value)) error = helperText || 'This field accepts numbers only.'
            break

          case 'email':
            if (value && !isEmail.test(value)) error = helperText || 'Please enter a valid email address.'
            break

          case 'password':
            if (value && !isValidPassword.test(value)) error = helperText || 'Password must be at least 8 characters'
            break

          case 'phone':
            if (value && !isPhone.test(value))
              error = helperText || 'Please enter a valid phone number. i.e: xxx-xxx-xxxx'
            break

          case 'zip':
            if (value && !isValidZip.test(value)) error = helperText || 'Please enter a valid zip code (i.e. xxxxx).'
            break

          case 'state':
            if (value && !isValidState.test(value)) error = helperText || 'We are only allowing residents from Virginia (VA). Please email info@northernneckgarbage.com to find out when we will be in your area.'
            break

          case 'checkbox':
            if (!checked) error = helperText || 'Please provide a valid value.'
            break

          case 'select':
            if (!value) error = helperText || 'Please select a value.'
            break

        }
      }
          if (name === 'service') {
            const validServices = ['junk_removal', 'weekly_trash', 'weekly_trash_recycling'];
            if (!validServices.includes(fieldValue as string)) {
              error = 'Please select a valid service option.';
            }
          }

          // Check if county field and fieldValue is not "northumberland"
          if (name === 'county' && fieldValue !== 'northumberland') {
            if (typeof fieldValue !== "boolean") {
              setWarning(`We just added services in ${fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1)}. There may be an additional service fee. please email info@northernneckgarbage.com or call 804-220-0029 to find out when your pickup date is.`);
            }
          } else {
            setWarning('');
          }

          // Check if county field and fieldValue is not "northumberland"
    // if (name === 'county' && fieldValue !== 'northumberland') {
    //     if (typeof fieldValue !== "boolean") {
    //         error = `We haven't got services in ${fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1)} yet, please email info@northernneckgarbage.com to find out when we will be in your area.`;
    //     }
    // }

      dispatch({ type: 'form-error', name, error })
    },
    []
  )

  const constextValue = useMemo(
    () => ({
      activeStep,
      formValues,
      handleChange,
      handleNext,
      handleBack,
      variant,
      margin,
        warning,
        setWarning
    }),
    [activeStep, formValues, handleChange, handleNext, handleBack]
  )

  return (
    <AppContext.Provider value={constextValue}>
      <div className='mui-step-form'>{children}</div>
    </AppContext.Provider>
  )
}
