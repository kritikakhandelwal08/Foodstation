import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests

const Login = ({ setShowLogin }) => {
    const [formData, setFormData] = useState({
        ownerEmail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/kitchen/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store JWT token
                alert('Login successful!');
                setShowLogin(false); // Close the login form after successful login
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div className="partner-container">
            <form className="partner-form" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <div className="input-field">
                        <label htmlFor="ownerEmail">Owner's Email</label>
                        <input
                            type="email"
                            id="ownerEmail"
                            name="ownerEmail"
                            placeholder="Owner's Email"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="register-btn-form">Login</button>
            </form>
        </div>
    );
};

export default Login;
