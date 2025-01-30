import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import Home from "./pages/Home.jsx";
//import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}>login</Route>
        <Route path="/home" element={<Home/>}>login</Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
