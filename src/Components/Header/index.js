import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Header = (props) => {
  const [state, setState] = useState({
    width:''
})

const resize = () => {
    setState({
        width:window.screen.width,
        pathname:window.location.pathname
    })
}
useEffect(()=>{
    window.addEventListener('resize', resize)
    setState({
        width:window.screen.width,
        pathname:window.location.pathname
    })
},[])
console.log(state)
    return (
        <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center">
    
          <div className="logo mr-auto">
             <a href="index.html"><img src="/img/logo.png" alt="" className="img-fluid"/></a>
          </div>
    
          <nav className={state.width>767?"nav-menu d-lg-block":'d-none '}>
            <ul>
              {/* <li className="active"><a href="#hero">Home</a></li> */}
              <li className="drop-down"><a href="">About us</a>
                <ul>
                  <li><a href="#cta">Link 1</a></li>
                  <li><a href="#">Link 2</a></li>
                  <li><a href="#">Link 3</a></li>
                </ul>
              </li>
              <li className={state.pathname==="/signin"?"blue_text":''}><Link to="/signin">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    )
}

export default Header