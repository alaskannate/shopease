import React, { useState } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleRegister = () => {
    // Replace with your API endpoint
    axios.post('http://localhost:3000/user/register', { email, password })
      .then(response => {
        setUser(response.data);  // Store user data in context
      })
      .catch(error => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterComponent;
