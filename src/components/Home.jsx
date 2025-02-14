import React, { useEffect } from 'react';
import './Website/web.css';
import { NavLink } from "react-router-dom";


export default function Content() {
    useEffect(() => {
        animateText();
    }, []);

    const animateText = () => {
        // Add animation classes to the elements you want to animate
        const heading = document.querySelector('.animate-heading');
        const paragraph = document.querySelector('.animate-paragraph');
        const image = document.querySelector('.animate-image');
        // Triggering the animation by adding a CSS class
        heading.classList.add('animate__animated', 'animate__fadeInLeft');
        paragraph.classList.add('animate__animated', 'animate__fadeInLeft');
        image.classList.add('animate__animated', 'animate__fadeInRight');
    };

    return (
        <>
            <div style={{ backgroundColor: "#1cd0f5" }}>
                <div className="container pt-2 "  >
                    <div className="w-lg-75  mx-lg-auto position-relative z-2 px-lg-3 shadow-5 rounded-pill  rounded-lg-pill bg-dark" >
                        <div className="container">
                            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 ">
                                <div className="col-md-3 mb-2 mb-md-0">
                                    <NavLink to="/" className="d-inline-flex link-body-emphasis text-decoration-none text-light">
                                        <strong>EmoScrape</strong>
                                    </NavLink>
                                </div>

                                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                                    <li><NavLink to="/Home" className={`nav-link px-2  `}>Home</NavLink></li>
                                    <li><NavLink to="/Home" className={`nav-link px-2`}>Services</NavLink></li>
                                    <li><NavLink to="/Home" className={`nav-link px-2  `}>About</NavLink></li>
                                    <li><NavLink to="/search" className={`nav-link px-2  `}>Search</NavLink></li>
                                </ul>

                                <div className="col-md-3 text-end">
                                    <NavLink to="/" className="d-inline-flex link-body-emphasis text-decoration-none text-light">
                                        <button type="button" className="btn rounded-3 text-light " style={{ backgroundColor: "#083171" }}>Logout</button>
                                    </NavLink>

                                </div>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-80" style={{ backgroundColor: "#1cd0f5" }}>
                    <div className="col-12 col-lg-8 px-4 py-5">
                        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                            <div className="col-12 col-lg-6">
                                <img
                                    src="./main1.jpg"
                                    className="d-block mx-lg-auto img-fluid animate-image"
                                    alt="Bootstrap Themes"
                                    width="auto"
                                    height="1000"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col-12 col-lg-6">
                                <h1 className="display-2 fw-bold text-body-emphasis lh-1 mb-3 animate-heading">
                                    Unleash Insights<br />Rapidly and Professionally.
                                </h1>
                                <p className="lead animate-paragraph">
                                    Elevate your understanding of social conversations:<br />
                                    Our platform extracts and analyzes sentiment from social media data, <br />
                                    empowering informed decisions.
                                </p>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <NavLink to='/search'>
                                        <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 " style={{ backgroundColor: "#083171" }}>
                                            Search
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container px-4 py-4" id="services">
                <img src="./px.jpeg" alt="" className="img-fluid   " />
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">

                        </div>
                        <h3 className="fs-2 text-body-emphasis text-center">Web Scrapping</h3>
                        <p className='text-justify'>Website can continuously collect live social media posts for analysis.  This is like eavesdropping on social media conversations to understand the feeling behind them.</p>

                    </div>
                    <div className="feature col">
                        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                        </div>
                        <h3 className="fs-2 text-body-emphasis text-center">Sentimental Analysis</h3>
                        <p className='text-justify'>It then analyzes the emotions behind these posts - positive, negative, or neutral.This helps understand public opinion on various topics.</p>

                    </div>
                    <div className="feature col">
                        <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                        </div>
                        <h3 className="fs-2 text-body-emphasis text-center">Visulization</h3>
                        <p className='text-justify'>Charts make complex data from social media analysis easier to digest. Imagine them as visual summaries, helping you grasp trends and sentiment at a glance.</p>

                    </div>
                </div>
            </div>

            <hr />


            <div className="container col-xxl-8 px-4 py-2" id="about">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="./About.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">About Us</h1>
                        <p className="lead text-justify">Welcome to Emo Scrape, where we harness the power of data to uncover insights from the vast realm of social media. Our mission is to provide users with a comprehensive understanding of public sentiment by analyzing online conversations across various platforms. Through cutting-edge data scraping techniques, we gather real-time data from popular social media sites, enabling us to capture the pulse of the digital world. From Twitter to Reddit, we curate a diverse range of user-generated content, ensuring that our analyses reflect the rich tapestry of opinions and emotions expressed online.</p>

                    </div>
                </div>
            </div>

        </>
    );
}
