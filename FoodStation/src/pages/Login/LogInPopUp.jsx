import React, { useState } from 'react';
import './LogInPopUp.css';
import axios from 'axios';  // Import Axios for making API requests
import { RxCross2 } from "react-icons/rx";

const LogInPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Log In");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission for login or signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = currentState === "Log In" 
                ? "http://localhost:8000/api/users/login"
                : "http://localhost:8000/api/users/register";

    const data = currentState === "Log In"
                 ? { email, password }
                 : { name, email, password };

    try {
      // Make API request (login/signup)
      const response = await axios.post(url, data);
      
      if (response.data.token) {
        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.token); 
        
        setMessage('Success! You are logged in.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred!');
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <RxCross2 onClick={() => setShowLogin(false)} style={{ cursor: "pointer", width: '20px' }} />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Log In"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <h5>By continuing, I agree to the terms of use & privacy policy.</h5>
        </div>

        {message && <p>{message}</p>}

        {currentState === "Log In" ? (
          <p>
            Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState("Log In")}>Log In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogInPopUp;
