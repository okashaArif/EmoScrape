import React, { useState } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const logInUser = () => {
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
        }
        if (email.length === 0) {
            alert("Email has been left blank!");
        } else if (password.length === 0) {
            alert("Password has been left blank!");
        } else {
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    navigate("/Home");
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                });
        }
    }
    let mystyle = {
        backgroundImage: "url('./bcg.jpg')",
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
        
    };

    return (
        <div style={mystyle}>
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{ width: "80%" }} 
        >
            <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center mt-3">
                    <img src="./login.jpg"  style={{ height: "80%" }}  alt="Login" className="img-fluid" />
                </div>
                <div className="col-md-4">
                    <form >
                        <div className="text-center mb-5" style={{ color: "#012056" }}>
                            <h2>Log Into Your Account</h2>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label fw-bold" htmlFor="email">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid email address"
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label fw-bold" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="form-control form-control-lg"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="rememberMe"
                                    style={{ border: "2px solid black" }}
                                />
                                <label className="form-check-label fs-7" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>

                        </div>

                        <div className="text-center mb-3">
                            <button type="button" className="btn btn-primary btn-lg" onClick={logInUser}  style={{ backgroundColor: "#083171" }}>
                                Login
                            </button>
                        </div>

                        <p className="small text-center">
                            Don't have an account?{" "}
                            <NavLink to="/register" className="link-danger">
                                Register
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}


