import React from 'react'

import './Website/web.css';
import { NavLink } from "react-router-dom";
export default function Navbar(props) {
    let mystyle={
        background:  "#EEEEFF"
    }
    return (
        <>
            <div className="container pt-2 " style={mystyle}>
                <div class="w-lg-75  mx-lg-auto position-relative z-2 px-lg-3 shadow-5 rounded-pill  rounded-lg-pill bg-dark">
                    <div className="container">
                        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                            <div className="col-md-3 mb-2 mb-md-0">
                                <NavLink to="/" className="d-inline-flex link-body-emphasis text-decoration-none text-light">
                                    <strong>EmoScrape</strong>
                                </NavLink>
                            </div>

                            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                                <li><NavLink to="/Home" className={`nav-link px-2  `}>Home</NavLink></li>
                                <li><NavLink to="/Services" className={`nav-link px-2`}>Services</NavLink></li>
                                <li><NavLink to="#About" className={`nav-link px-2  `}>About</NavLink></li>
                            </ul>

                            <div className="col-md-3 text-end">
                                <button type="button" className="btn btn-primary rounded-3">Logout</button>
                            </div>
                        </header>
                    </div>
                </div>
            </div>
            </>

    )
}
