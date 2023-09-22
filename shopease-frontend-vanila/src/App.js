import React from "react";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import User from "./components/User";
import Wishlist from "./components/Wishlist"





function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
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
