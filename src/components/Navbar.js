import React from 'react'
import logo from '../logo.png';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className={`navbar-brand nav-link ${location.pathname === "/" ? "active" : ""}`} to="/"><img src={logo} height={50} width={50} alt='logo' /><strong>iNoteBook</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link to='/login' className='btn btn-light mx-2'>Login</Link>
                        <Link to='/signup' className='btn btn-light mx-2'>SignUp</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
