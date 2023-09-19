import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { products, user, cartItems, wishlistItems } from './data';
import Home from "./components/Home";
import Product from "./components/Product";
import User from "./components/User";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;

