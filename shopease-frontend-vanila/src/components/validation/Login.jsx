import React, { useState } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleLogin = () => {
    // Replace with your API endpoint
    axios.post('/api/login', { email, password })
      .then(response => {
        setUser(response.data);  // Store user data in context
      })
      .catch(error => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
