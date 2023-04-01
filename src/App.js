import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home, Products, Cart, Contact } from "./pages";
import Layout from "./components/layout";
import SingleProduct from "./pages/products";

function RouteNotFound() {
  return <div>Page not found</div>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
