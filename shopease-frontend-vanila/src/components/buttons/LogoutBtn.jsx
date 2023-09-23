import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory

axios.defaults.withCredentials = true;

const LogoutBtn = ({ userId }) => {
  const history = useHistory(); // Initialize useHistory

  const Logout = () => {
    axios.post('http://localhost:3000/auth/logout')
      .then(response => {
        console.log("user has been logged out");
        history.push('/login'); // Redirect to login page
      })
      .catch(error => {
        console.error('Error logging out user:', error);
      });
  };

  return (
    <button onClick={Logout}>Logout</button>
  );
};

export default LogoutBtn;