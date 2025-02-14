import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, registerables } from "chart.js";
import { NavLink, useLocation } from 'react-router-dom';
import './Website/web.css';

export default function Home1(props) {
    Chart.register(CategoryScale);
    Chart.register(...registerables);
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                align: 'center',
                position: 'top',
            },
        },

    };
    let mystyle = {
        backgroundImage: "url('./bcg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };
    const location = useLocation();
    const Data = location.state || {};
    const textArray = Data.Data.Text || [];
    const firstText = textArray[0]?.split(' ').slice(0, 20).join(' ');
    const secondText = textArray[1]?.split(' ').slice(0, 20).join(' ');
    const positive = Data.Data.positive;
    const negative = Data.Data.negative;
    const neutral = Data.Data.neutral;
    console.log(positive);
    console.log(negative);
    console.log(neutral);

    return (
        <>
            <div style={mystyle} className=' vh-100'>
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
                                    <NavLink to="/">
                                        <button type="button" className="btn rounded-3 text-light " style={{ backgroundColor: "#083171" }}>Logout</button>
                                    </NavLink>
                                </div>
                            </header>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row my-3">
                            <div className="col">
                                <div className="card text-white bg-primary mb-3">
                                    <div className="card-header font-weight-bold display-6">Total Posts</div>
                                    <div className="card-body">
                                        <p className="card-text display-7">{textArray.length} Tweets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-white bg-success mb-3">
                                    <div className="card-header font-weight-normal display-6">Total Positive</div>
                                    <div className="card-body">
                                        <p className="card-text display-7">{positive}  Tweets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-white bg-danger mb-3">
                                    <div className="card-header font-weight-normal display-6">Total Negative</div>
                                    <div className="card-body">
                                        <p className="card-text display-7">{negative}  Tweets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-white bg-warning mb-3">
                                    <div className="card-header font-weight-normal display-6">Total Neutral</div>
                                    <div className="card-body">
                                        <p className="card-text display-7">{neutral}  Tweets</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container ">
                        <div className="row text-center">
                            <div className="col-6 graph1 " style={{ height: "400px" }}>
                                <Bar
                                    data={{
                                        labels: ['Positive', 'Negative', 'Neutral'],
                                        datasets: [
                                            {
                                                label: ['Positive', 'Negative', 'Neutral'],
                                                data: [positive, negative, neutral],
                                            },
                                        ]
                                    }}
                                    options={chartOptions}
                                ></Bar>
                            </div>
                            <div className="col-6 graph2 " style={{ height: "400px" }}>
                                <Doughnut
                                    data={{
                                        labels: ['Positive', 'Negative', 'Neutral'],
                                        datasets: [
                                            {
                                                label: 'Sentimental Analysis',
                                                data: [positive, negative, neutral],
                                            },
                                        ]
                                    }}
                                    options={chartOptions}
                                ></Doughnut>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container border border-secondary mt-4" style={{ maxWidth: "50%" }}>
                    <h3 style={{ color: "#083171" }}>Posts</h3>
                    <hr />
                    <div className="row m-2">
                        <div className="col-md-1">
                            <img src="./avatar.png" alt="Avatar" style={{ height: "50px", width: "50px" }} className="img-fluid rounded-circle" />
                        </div>
                        <div className="col-md-7">
                            <p className='small'>{firstText} ...</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row mx-2">
                        <div className="col-md-1">
                            <img src="./avatar.png" alt="Avatar" style={{ height: "50px", width: "50px" }} className="img-fluid rounded-circle" />
                        </div>
                        <div className="col-md-7">
                            <p className='small'>{secondText} ...</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
