import React from "react";
import Image1 from "./img/image1.jpg";
import Image2 from "./img/image2.jpg";

const WorkAgency = () => {
  return (
    <div>
      <div className="row mt-5">
        <div className="col-md-6 Emp-subContainer">
          <h1>Work With MSP Programs</h1>
          <p>
            Glider is used by leading MSP’s to power their hiring programs to
            improve candidate quality. Using Glider, MSP’s open positions along
            with assessments to be used for them and share them with agencies.
            Sign up for Glider to get access to these positions, invite
            candidates to these assessments and send shortlisted ones to MSP’s.
          </p>
        </div>
        <div className="col-md-6">
          <img src={Image1} alt="Image1" width="100%" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <img src={Image2} alt="Image1" width="100%" />
        </div>
        <div className="col-md-6 Emp-subContainer">
          <h1>Boost Your Placement Rate</h1>
          <p>
            Find the best candidates and quickly verify their skills with
            Job-Recruiter's AI-powered matching and screening.
          </p>
          <span>
            Evaluate candidates in all kinds of environments with real-world
            tasks — from 40+ programming languages to data science tasks.
            Detailed skill reports make your candidates stand out from the
            crowd, leading to more placements and more business for your firm.
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkAgency;
