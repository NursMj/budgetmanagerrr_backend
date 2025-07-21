export const createUserValidationSchema = {
	name: {
		trim: true,
		notEmpty: {
			errorMessage: 'Name is required'
		},
		isLength: {
			options: { min: 2, max: 50 },
			errorMessage: 'Name must be between 2-50 characters'
		},
		matches: {
			options: /^[a-zA-Z\s]+$/,
			errorMessage: 'Name can only contain letters and spaces'
		},
		escape: true
	},
	email: {
		trim: true,
		notEmpty: {
			errorMessage: 'Email is required'
		},
		isEmail: {
			errorMessage: 'Please enter a valid email'
		},
		normalizeEmail: true
	},
	password: {
		trim: true,
		notEmpty: {
			errorMessage: 'Password is required'
		},
		isLength: {
			options: { min: 8 },
			errorMessage: 'Password must be at least 8 characters'
		},
	}
};
