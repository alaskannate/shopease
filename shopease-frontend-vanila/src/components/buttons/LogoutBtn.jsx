import React from 'react';
import axios from 'axios';

const LogOutBtn = ({ userId }) => {
  const Logout = () => {
    axios.post(`/auth/logout`)
      .then(_response => {
        console.log("user has been logged out ");
      })
      .catch(error => {
        console.error('Error logging out user:', error);
      });
  };

  return (
    <button onClick={ Logout }>Logout</button>
  );
};

export default LogoOutBtn;
