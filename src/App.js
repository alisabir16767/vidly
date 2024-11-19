import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Navbar from './components/common/navbar';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import NewMovie from './components/addnewmovie';
import "./App.css";


function App() {
  return (
    <div>
      <Navbar/>
    <main className="container">
      <Routes>
      <Route path="/new" element={<NewMovie/>}></Route>
      <Route path="/register" element={<RegisterForm/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/movies" element={<Movies />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </main>
    </div>

  );
}

export default App;
