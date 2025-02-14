import React from 'react';
import Content from './components/Home';
import Home from './components/Search';
import Home1 from './components/dashboard';

import LoginPage from './components/signup'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import RegisterPage from './components/register';
export default function App() {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/Home" element={
        <React.Fragment>
        <Content/>
        </React.Fragment>
        }/>
        <Route path='/search' element={<Home/>}/>
        <Route path='/dashboard' element={<React.Fragment>
        <Home1/>  
        </React.Fragment>}/>
        
        </Routes>
        </BrowserRouter>
       
  );
}
