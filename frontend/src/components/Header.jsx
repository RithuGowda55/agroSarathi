import React, { useState } from "react"
import { Link } from "react-router-dom"
// import Head from "./Head"
import "../css/header.css"
// import Blogpost from "../../blogpost/Blog"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>AGRO SARATHI</h1>
            <span>Your Agricultural Companion</span>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/dashboard'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>Resources</Link>
            </li>
            <li>
              <Link to='/purchases'>Purchases</Link>
            </li>
            <li>
              <Link to='/home'>Blog</Link>
            </li>
            <li>
              <Link to='/govscheme'>GovScheme</Link>
            </li>
            <li>
              <Link to='/costpredict'>CostPredict</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/pdd'>Plant Disease Detector</Link>
            </li>
            <li>
              <Link to='/explore'>Explore</Link>
            </li>
            <li>
              <Link to='/crop'>Crop Suggest</Link>
            </li>
          </ul>
          <div className="start">
            <div className="button">
              <img
                src={require('../css/logo.png')} 
                alt="Project Logo"
                className="projectLogo"
                style={{width:"99px" ,height:"55px"}}
              />
            </div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
