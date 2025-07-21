export const authValidationSchema = {
	email: {
		trim: true,
		notEmpty: {
			errorMessage: 'Email is required'
		},
		normalizeEmail: true
	},
	password: {
		trim: true,
		notEmpty: {
			errorMessage: 'Password is required'
		},
	}
};
