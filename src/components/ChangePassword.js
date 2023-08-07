import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});

    const storedAccessToken = localStorage.getItem('accessToken');

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidPassword = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            return passwordRegex.test(password);
        }

        // Walidacja pól
        const formErrors = {};
        let isValid = true;

        if (!newPassword.trim()) {
            formErrors.newPassword = 'Password is required';
            isValid = false;
        } else if (!isValidPassword(newPassword)) {
            formErrors.newPassword =
                'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit';
            isValid = false;
        }

        setErrors(formErrors);

        if (!isValid) {
            return;
        }

        fetch('http://localhost:5000/users/changepasswd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedAccessToken}`
            },
            body: JSON.stringify({ new_password: newPassword })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Password changed successfully');
                    localStorage.removeItem('accessToken');
                    window.location = "/"
                } else if (response.status === 404) {
                    console.log('User not found');
                } else if (response.status === 400) {
                    console.log('New password not provided');
                }
            })
            .catch(error => {
                // Obsługa błędów
                console.error(error);
            });
    };

    return (
        <Layout>
            <div>
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        New Password:
                        <input type="password"
                            className={`form-control form-control-lg ${errors.newPassword ? 'is-invalid' : ''}`}
                            value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        {errors.newPassword && (<div className="invalid-feedback">{errors.newPassword}</div>)}
                    </label>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-info">
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ChangePassword;
