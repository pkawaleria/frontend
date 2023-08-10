// import React, { useState } from 'react';
// import Layout from './Layout';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Walidacja pól
//         const formErrors = {};
//         let isValid = true;

//         if (!email.trim()) {
//             formErrors.email = 'Email is required';
//             isValid = false;
//         }

//         if (!password.trim()) {
//             formErrors.password = 'Password is required';
//             isValid = false;
//         }

//         setErrors(formErrors);

//         if (!isValid) {
//             return;
//         }

//         fetch('http://localhost:5000/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 const accessToken = data.access_token;
                
//                 localStorage.setItem('accessToken', accessToken);
//                 //Przekierowanie na stronę główną
//                 window.location = "/"
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     return (
//         <Layout> 
//             <div className="content-section">
//                 <form onSubmit={handleLogin}>
//                     <fieldset className="form-group">
//                         <legend className="border-bottom mb-4">Log In</legend>
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
//                         <div className="form-check">
//                             <input type="checkbox" className="form-check-input" id="remember" onChange={setRememberMe} />
//                             <label htmlFor="remember" className="form-check-label">
//                                 Remember Me
//                             </label>
//                         </div>
//                     </fieldset>
//                     <div className="form-group">
//                         <button type="submit" className="btn btn-outline-info">
//                             Log In
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             <div className="border-top pt-3">
//                 <small className="text-muted">
//                     Need An Account? <Link className="ml-2" to="/register">Sign Up Now</Link>
//                 </small>
//             </div>
//         </Layout>
//     );
// };

// export default Login;

import Input from "./Form/Input"

function Login() {
    return (
        <div className="flex items-center justify-center h-screen">
            <form> 
                <Input placeholder="Podaj nazwe użytkownika"/>
                <Input placeholder="Podaj nazwe użytkownika"/>
                <Input placeholder="Podaj nazwe użytkownika"/>
                <Input placeholder="Podaj nazwe użytkownika"/>
            </form>
        </div>
    )
}

export default Login