// Reusable, dependency-free form validation helpers

export const isRequired = (value) => value !== undefined && value !== null && String(value).trim().length > 0

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())

export const isMinLength = (value, min) => String(value || '').trim().length >= min

export const isValidPhone = (value) => /^[0-9+\-\s()]{7,20}$/.test(String(value).trim())

export const isValidCardNumber = (value) => /^\d{13,19}$/.test(String(value).replace(/\s/g, ''))

export const isValidExpiry = (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(String(value).trim())

export const isValidCVV = (value) => /^\d{3,4}$/.test(String(value).trim())

export const isValidZip = (value) => /^\d{4,10}$/.test(String(value).trim())

export const passwordsMatch = (a, b) => a === b

/**
 * Validate a set of fields against a rules map.
 * rules: { fieldName: [ [validatorFn, message], ... ] }
 * Returns an object of { fieldName: errorMessage } for failing fields only.
 */
export const validateFields = (values, rules) => {
  const errors = {}
  Object.entries(rules).forEach(([field, checks]) => {
    for (const [validator, message] of checks) {
      if (!validator(values[field])) {
        errors[field] = message
        break
      }
    }
  })
  return errors
}
