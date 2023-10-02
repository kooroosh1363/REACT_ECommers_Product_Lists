import React, { useMemo, useRef, useState } from 'react';
// import './App.css';
import Home from './pages/home/Home';
import Product from './pages/product/Products';
import { Route, Routes } from "react-router-dom";



function App() {

  return (
    <div>
    
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
