export const validateField = (field, errorMessage) => {
    let error = ""
    if (field === "") {
        error = errorMessage
    }

    return error
}