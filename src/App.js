import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Register from './feautre/Register';
import Login from './feautre/Login';
import Home from './Components/Home';

const App = () => {


  return (
    <BrowserRouter>

        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      
    </BrowserRouter>
  );
}

export default App;