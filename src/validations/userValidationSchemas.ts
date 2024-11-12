export const createUserValidationSchema = {
    userName: {
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        },
    },
    displayName: {
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
