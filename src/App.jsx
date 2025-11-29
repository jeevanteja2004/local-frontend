import React from 'react'
import './App.css'

import Signup from './pages/Signup';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/register" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <ProtectedRoute exact path="/" element={<Home/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
