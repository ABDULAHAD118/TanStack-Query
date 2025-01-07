import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Product from "./Product";
import Navbar from "./Navbar";
import AddProduct from "./AddProduct";

export default function App() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl p-10 font-bold flex justify-center items-center">
        TanStack React Query
      </h1>
      <Routes>
        {/* Route for the home page (Products List) */}
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}
