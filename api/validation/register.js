const Validator = require('validator')

module.exports = function (data) {
  let errors = {}
  

	if (Validator.isEmpty(data.firstName)) {
		errors.email = 'First name field is required'
	}

	if (Validator.isEmpty(data.lastName)) {
		errors.email = 'Last name field is required'
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required'
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required'
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must between 6 and 30 characters'
	}

	if (Validator.isEmpty(data.passwordSecond)) {
		errors.passwordSecond = 'Confirm password is required'
	}

	if (!Validator.equals(data.password, data.passwordSecond)) {
		errors.passwordSecond = 'Passwords must match'
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	}
}
