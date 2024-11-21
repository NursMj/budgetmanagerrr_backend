export const createUserValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        },
    },
    display_name: {
        notEmpty: {
            errorMessage: "Display name cannot be empty"
        },
        isString: {
            errorMessage: "Display name must be a string"
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isString: {
            errorMessage: "Password must be a string"
        },
    }
}
