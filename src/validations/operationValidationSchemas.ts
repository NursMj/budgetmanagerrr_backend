export const createOperationValidationSchema = {
	category_id: {
		notEmpty: {
			errorMessage: 'category_id is required',
		},
		isInt: {
			errorMessage: 'category_id must be an integer',
		},
		toInt: true,
	},
	operation_type: {
		notEmpty: {
			errorMessage: 'operation_type is required',
		},
		isString: {
			errorMessage: 'operation_type must be a string',
		},
		isIn: {
			options: [['income', 'outcome']],
			errorMessage: 'operation_type must be one of: [income, outcome]',
		},
	},
	sum: {
		notEmpty: {
			errorMessage: 'sum is required',
		},
		isFloat: {
			errorMessage: 'sum must be a number greater than 0',
		},
		toFloat: true,
	},
	date: {
		notEmpty: {
			errorMessage: 'date is required',
		},
		isISO8601: {
			errorMessage: 'date must be a valid ISO 8601 date string',
		},
		toDate: true,
	},
	description: {
		isString: {
			errorMessage: 'description must be a string',
		},
		isLength: {
			options: { max: 255 },
			errorMessage: 'description cannot exceed 255 characters',
		},
		optional: true,
		trim: true,
	},
};
export const updateOperationValidationSchema = {
	category_id: {
		optional: true,
		isInt: {
			errorMessage: 'category_id must be an integer',
		},
		toInt: true,
	},
	operation_type: {
		optional: true,
		isString: {
			errorMessage: 'operation_type must be a string',
		},
		isIn: {
			options: [['income', 'outcome']],
			errorMessage: 'operation_type must be one of: [income, outcome]',
		},
	},
	sum: {
		optional: true,
		isFloat: {
			errorMessage: 'sum must be a number greater than 0',
		},
		toFloat: true,
	},
	date: {
		optional: true,
		isISO8601: {
			errorMessage: 'date must be a valid ISO 8601 date string',
		},
		toDate: true,
	},
	description: {
		isString: {
			errorMessage: 'description must be a string',
		},
		isLength: {
			options: { max: 255 },
			errorMessage: 'description cannot exceed 255 characters',
		},
		optional: true,
		trim: true,
	},
};
