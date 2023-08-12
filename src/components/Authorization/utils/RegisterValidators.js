export const validateUsername = (username) => {
    const charRegex = new RegExp('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
    const lengthRegex = new RegExp('^.{5,20}$');
    let error = "";

    if (username === "") {
        error = "Nazwa użytkownika nie może być pusta";
    } else if (!lengthRegex.test(username)) {
        error = "Nazwa użytkownika musi być w zakresie 5-20 znaków";
    } else if (!charRegex.test(username)) {
        error = "Nazwa może zawierać litery alfabetu angielskiego, cyfry oraz symbol ( _ ) w środku";
    }

    return error
}

export const validateEmail = (email) => {
    const emailRegex = new RegExp(/^[a-zA-Z][a-zA-Z0-9._]{1,}[a-zA-Z0-9]@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/);
    let error = ""

    if (email === "") {
        error = "Email nie może być pusty"
    } else if (!emailRegex.test(email)) {
        error = "Upewnij się że email posiada znak ( @ ) oraz nie posiada znaków specjalnych poza ( _ lub . )"
    }

    return error
}

export const validatePassword = (password) => {
    let error = ""

    if (password === "") {
        error = "Hasło nie może być puste"
    } else if (password.length < 8) {
        error = "Hasło musi się składać z minimum 8 znaków"
    }

    return error
}

export const arePasswordsIdentical = (password, confirmPassword) => {
    let error = ""
    if (password !== confirmPassword) {
        error = "Hasła muszą być identyczne"
    }

    return error
}