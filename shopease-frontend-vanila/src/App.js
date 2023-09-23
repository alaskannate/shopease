import React from "react";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import User from "./components/User";
import Wishlist from "./components/Wishlist"
import Register from "./components/auth/Register"
import LoginPage from "./components/auth/Login"
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/users" element={<User />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
