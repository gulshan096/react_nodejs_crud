import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Userlist from './pages/Userlist';
import PhonepeForm from './pages/PhonepeForm';
import Success from './pages/Success';
import Failure from './pages/Failure';
import Booking from './pages/Booking';

const AllRoutes = () => {
  return (
    <>
      <Router>
       <Header />
        <Routes>
            <Route path='/' Component={Home} />
            <Route path='/phonepe-payment' Component={PhonepeForm} />
            <Route path='/success' Component={Success} />
            <Route path='/failure' Component={Failure} />
            <Route path='/all-user' Component={Userlist} />
            <Route path='/all-booking' Component={Booking} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default AllRoutes