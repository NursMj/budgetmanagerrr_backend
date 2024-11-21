export const createCategoryValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name cannot be empty"
        },
        isString: {
            errorMessage: "Name must be a string"
        },
    },
}
