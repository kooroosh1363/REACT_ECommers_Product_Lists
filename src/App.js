import React from 'react';
import './App.css';
import Header from './component/header/Header';
import MainContent from './component/mainContent/MainContent';
import Footer from './component/footer/Footer';
// import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="container">
     <Header/>
     <MainContent/>
     <Footer/>
    </div>
  );
}

export default App;
