import React, { useState, useRef, useEffect } from 'react';

import logo from './img/logo.svg';

import './App.css';

import HomePage from './pages/HomePage';
import OrganizationPage from './pages/OrganizationPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
       {/* Header */}
       <header className="header">
         {/* Logo */}
        <div className='logo'>
          <a href="/">
            <h2 className='logo-text'>LOGO</h2>
          </a>
        </div>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/organization/:id" element={<OrganizationPage />} />  
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/signup" element={<SignupPage />} />        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
