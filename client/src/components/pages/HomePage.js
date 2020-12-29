import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home: Job-Recruitment";
  }, []);

  return (
    <div className="container home-container ">
      <div className="row" id="main-container">
        <div className="col-md-6" id="left-div-container">
          <h1>Employers</h1>
          <p>
            Find the most suitable candidates for any role using assessments
            based on real-world tasks.
          </p>

          <Link to="employerDetails" style={{ textDecoration: "none" }}>
            <button className="btn btn-lg btn-light btn-block">
              LEARN MORE
            </button>
          </Link>
        </div>
        <div className="col-md-6" id="right-div-container">
          <h1>Agencies</h1>
          <p>
            Boost placement rates multi-fold with Glider by sending the right
            candidates.
          </p>
          <Link to="/agenciesDetails" style={{ textDecoration: "none" }}>
            <button className="btn btn-lg btn-light btn-block">
              LEARN MORE
            </button>
          </Link>
        </div>

        <div className="container Emp-container mb-5">
          <h1>Drive Better Talent To The Right Place</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
