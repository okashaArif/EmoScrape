import { React, useState } from 'react';
import './Website/web.css';
import './Website/search.css';
import { NavLink, useNavigate } from "react-router-dom";
import Loading from './Loading';
export default function Home(props) {
  let mystyle = {
    backgroundImage: "url('./bcg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const checkSearch = () => {
  
    if (textInput.length === 0) {
      alert("Search Bar is Empty");
  }
  else if(activeButton === null){
    alert("Select a Social Media App");
  }
  else{
    navigate("/Dashboard");
  }
  };
  


  const analyzeSentiment = async () => {
    try {
      setIsLoading(true);
      const dataToSend = { text: textInput };
      const response = await fetch("http://127.0.0.1:5000/reddit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      const jsonData = await response.json();
      
      console.log(jsonData);
      navigate("/Dashboard", { state: { Data: jsonData } });
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const analyzeSentiment1 = async () => {
    try {
      setIsLoading(true);
      const dataToSend = { text: textInput };
      const response = await fetch("http://127.0.0.1:5000/twitter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      const jsonData = await response.json();
      console.log(jsonData);
      navigate("/Dashboard", { state: { Data: jsonData } });
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRedditClick = () => {
    setActiveButton("reddit");
    analyzeSentiment();
  };
  const handleTwitterClick = () => {
    setActiveButton("twitter");
    analyzeSentiment1();
  };
  
  return (
    <>
      <div style={mystyle} className='vh-100'>
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
        <div className="container mt-5" >
          <div className="row d-flex justify-content-center" >
            <h1 className="ls-tight fw-bolder display-3 mb-2" style={{ color: "#083171" }}>Search For Hot Topic Around Social Media</h1>
            <div className="col-md-6" >
              <div className="card" >
                <div className="input-box">
                  <input type="text" className="form-control border border-primary rounded" onChange={(e) => setTextInput(e.target.value)} />
                    <button className="search-btn" style={{ backgroundColor: "#083171", color: "#fff" }} onClick={checkSearch}>Search</button>

                </div>
                <div className="container d-flex justify-content-center" >
                  <div className="row mt-5">
                    <div className="col d-flex justify-content-center"  >
                    <button type="button" className={`btn btn-outline-danger ${activeButton === "reddit" ? "disabled" : ""}`} onClick={handleRedditClick} style={{ pointerEvents: activeButton === "reddit" ? "none" : "auto", backgroundColor: activeButton === "reddit" ? "#c0c0c0" : "" }}>
                        <i className="fab fa-reddit"></i> Reddit
                      </button>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <button type="button" className={`btn btn-outline-primary ${activeButton === "twitter" ? "disabled" : ""}`} onClick={handleTwitterClick} style={{ pointerEvents: activeButton === "twitter" ? "none" : "auto", backgroundColor: activeButton === "twitter" ? "#c0c0c0" : "" }}>
                        <i className="fab fa-twitter"></i> Twitter
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="ls-tight  display-12  mt-5 mb-2 " >Suggestions</h3>
                <div className="list border-bottom">
                  <i className="fa fa-search"></i>
                  <div className="d-flex flex-column ml-3">
                    <span>US President</span>
                    <small className="text-dark">#politics</small>
                  </div>
                </div>

                <div className="list border-bottom" >
                  <i className="fa fa-search"></i>
                  <div className="d-flex flex-column ml-3">
                    <span>Cyber Crime</span>
                    <small className="text-dark">#Infromation Technology</small>
                  </div>
                </div>

                <div className="list border-bottom" >
                  <i className="fa fa-search"></i>
                  <div className="d-flex flex-column ml-3">
                    <span>Terrorism</span>
                    <small className="text-dark">#news</small>
                  </div>
                </div>

                <div className="list" >
                  <i className="fa fa-search"></i>
                  <div className="d-flex flex-column ml-3">
                    <span>Palestine</span>
                    <small className="text-dark" >#news</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {isLoading && <Loading />}
    </>
  );
}
