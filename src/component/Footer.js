import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {


  return (
    <>
      <div class="bg-dark mt-5 py-5">
        <div class="mx-5">
          <div class="row">
            <div class="col-lg-3">
              <div class="text-center text-white">
                <Link className="navbar-brand" to="#">Navbar </Link>
                <ul class="list-group py-3">
                  <li class="list-group-item text-justify bg-dark text-white border-none">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="text-center text-white">
                <h5>Consumer Policy</h5>
                <ul class="list-group py-3">
                  <li class="list-group-item">Terms & Condition</li>
                  <li class="list-group-item">Privacy Policy</li>
                  <li class="list-group-item">FAQ</li>
                  <li class="list-group-item">Security</li>
                  <li class="list-group-item">Refund</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="text-center text-white">
                <h5>Socials</h5>
                <ul class="list-group py-3">
                  <li class="list-group-item">Facebok</li>
                  <li class="list-group-item">Twitter</li>
                  <li class="list-group-item">Linkdin</li>
                  <li class="list-group-item">Instagram</li>
                  <li class="list-group-item">Youtube</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="text-center text-white">
                <h5>Registered Office Address</h5>
                <ul class="list-group py-3 bg-dark">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Morbi leo risus</li>
                  <li class="list-group-item">Porta ac consectetur ac</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row text-center py-2'>
        <div className='col-md-6'>
          <p>© 1996-2023, travello.com, Inc. or its affiliates</p>
        </div>
        <div className='col-md-6'>
          <p className='nav-link'>design and developrd by <Link to="">itexpress.in</Link> </p>
        </div>
      </div>
    </>
  )
}

export default Footer