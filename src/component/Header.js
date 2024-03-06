import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  console.log(user);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container">
          <Link className="navbar-brand" to="#">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active px-3" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/all-user">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/all-booking">Booking</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle px-3" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Payment Gateway
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/phonepe-payment">Phonepe</Link> </li>
                  <li><Link className="dropdown-item" to="/razorpay-payment">Razorpay</Link> </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
              <li className='nav-item px-3'>
                   {isAuthenticated && isAuthenticated ? (
                   <p className='nav-link'>{user.name}</p>
                   ):''}
              </li>
              {isAuthenticated && isAuthenticated ? (

                <li className='nav-item px-3'>
                  <button className='btn btn-primary' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                </li>
              ) : (

                <li className='nav-item px-3'>
                  <button className='btn btn-primary' onClick={() => loginWithRedirect()}>Log In</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header