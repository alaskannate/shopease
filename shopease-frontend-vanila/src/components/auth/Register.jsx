// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!email || !password) return setError("Fields cannot be empty");
    setLoading(true);
    axios.post('http://localhost:3000/auth/register', { email, password })
      .then(response => {
        setLoading(false);
        // Do something with the user data
      })
      .catch(err => {
        setLoading(false);
        setError("Error during registration");
      });
  };

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;