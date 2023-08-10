// import React, { useState } from 'react';
// import Layout from './Layout';

// const Register = () => {

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState('');

//     const handleRegister = (e) => {
//         e.preventDefault();

//         // Walidacja email
//         const isValidEmail = (email) => {
//             const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//             return emailRegex.test(email);
//         };

//         // Walidacja hasła
//         const isValidPassword = (password) => {
//             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//             return passwordRegex.test(password);
//         }

//         // Walidacja pól
//         const formErrors = {};
//         let isValid = true;

//         if (!username.trim()) {
//             formErrors.username = 'Username is required';
//             isValid = false;
//         }

//         if (!email.trim()) {
//             formErrors.email = 'Email is required';
//             isValid = false;
//         } else if (!isValidEmail(email)) {
//             formErrors.email = 'Invalid email format';
//             isValid = false;
//         }

//         if (!password.trim()) {
//             formErrors.password = 'Password is required';
//             isValid = false;
//         } else if (!isValidPassword(password)) {
//             formErrors.password =
//                 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit';
//             isValid = false;
//         }

//         if (password !== confirmPassword) {
//             formErrors.confirmPassword = 'Passwords do not match';
//             isValid = false;
//         }

//         setErrors(formErrors);

//         if (!isValid) {
//             return;
//         }

//         fetch('http://localhost:5000/users/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username,
//                 email,
//                 password,
//                 confirmPassword,
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.message === 'User registered successfully') {

//                     setUsername('');
//                     setEmail('');
//                     setPassword('');
//                     setConfirmPassword('');

//                     setMessage('User registered successfully');
//                 } else {
//                     setMessage('Registration failed');
//                 }
//             })
//             .catch((error) => {
//                 setMessage('Registration failed');
//                 console.error(error);
//             });
//     };

//     return (
//         <Layout>
//             <div className="content-section">
//                 <form onSubmit={handleRegister}>
//                     <fieldset className="form-group">
//                         <legend className="border-bottom mb-4">Join Today</legend>
//                         <div className="form-group">
//                             <label htmlFor="username" className="form-control-label">
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                             {errors.username && <div className="invalid-feedback">{errors.username}</div>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email" className="form-control-label">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password" className="form-control-label">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="confirm_password" className="form-control-label">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="confirm_password"
//                                 className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                             {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
//                         </div>
//                     </fieldset>
//                     <div className="form-group">
//                         <button type="submit" className="btn btn-outline-info">
//                             Register
//                         </button>
//                     </div>
//                 </form>
//                 {message && <p>{message}</p>}
//             </div>
//         </Layout>
//     );
// };

// export default Register;
import React from "react"
import { useState } from "react"
import Input from "./Form/Input"
import SubmitButton from "../authorization/Form/SubmitButton"
import SwapToRegister from "./Form/SwapToRegisterButton"
import SwapToLogin from "./Form/SwapToLoginButton"
import { AiFillHome } from "react-icons/ai"

export default function Register() {
    const [newUserData, setNewUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    })

    const onChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value })

        if (e.target.name === "username") validateUsername(e.target.value)
        if (e.target.name === "email") validateEmail(e.target.value)
        if (e.target.name === "password") validatePasswords(e.target.value)
    }

    const validateUsername = (username) => {
        const charRegex = new RegExp('(?=.*[a-zA-Z0-9!@#$%^&*])')
        const lengthRegex = new RegExp('(?=.{5,})')

        if (!lengthRegex.test(username)) {
            setErrors({...errors, "usernameError": "Nazwa musi się składać z minimum 5 znaków"})
            return
        }

        if (!charRegex.test(username)) {
            setErrors({...errors, "usernameError": "Nazwa może zawierać litery alfabetu angielskiego oraz znaki specjalne"})
            return
        }

        setErrors({...errors, "usernameError": ""})
        return
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            setErrors({...errors, "emailError": "Upewnij się że email posiada znak ( @ )"})
            return
        }

        setErrors({...errors, "emailError": ""})
        return
    }

    const validatePasswords = () => {
        console.log(newUserData.password.length)
        if (newUserData.password.length < 8) {
            setErrors({...errors, "passwordError": "Hasło musi się składać z minimum 8 znaków"})
            return
        }

        setErrors({...errors, "passwordError": ""})
        

        if (newUserData.confirmPassword !== newUserData.password) {
            setErrors({...errors, "confirmPasswordError": "Hasła muszą być identyczne"})
            return
        }

        setErrors({...errors, "confirmPasswordError": ""})
        return
    }

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Podaj nazwę użytkownika",
            label: "Nazwa użytkownika",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Podaj email",
            label: "Email",
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Podaj hasło",
            label: "Hasło",
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Podaj ponownie hasło",
            label: "Powtórz hasło",
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        if (errors.confirmPasswordError.length === 0 &&
            errors.passwordError.length === 0 &&
            errors.emailError.length === 0 &&
            errors.usernameError.length === 0) {
                console.log("Nie ma bledow")
            } else {
                console.log("Są błędy")
            }
    }

    return (
        <div className="flex items-center justify-center h-screen linear gradient-bg">
            <div className="group">
                <AiFillHome onClick={() => window.location = "/"} className="absolute top-6 left-8 text-5xl text-white hover:bg-transparent hover:border-b-4 hover:cursor-pointer transition-colors duration-200 rounded bg-blue-600/15" />
                <span className="group-hover:scale-100 home-tooltip">Strona główna</span>
            </div>
            <form className="bg-white py-5 px-8 rounded-md border-0 border-blue-600 w-96" onSubmit={handleSubmit}>
                <div className="flex">
                    <SwapToRegister isOn={true} />
                    <SwapToLogin />
                </div>
                {inputs.map((input) => (
                    <React.Fragment key={input.id}>
                        <Input
                            key={input.id}
                            {...input}
                            value={newUserData[input.name]}
                            onChange={onChange} />
                        <span
                            className={`text-sm mt-1 text-red-600 ${errors[input.name + "Error"] ? 'block' : 'hidden'}`}>{errors[input.name + "Error"]}</span>
                    </React.Fragment>
                ))}
                <div className="flex space-x-4 mt-5">
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}