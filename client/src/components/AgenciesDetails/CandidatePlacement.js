import React from "react";
import Image3 from "./img/image3.png";
import Image4 from "./img/image4.png";

const CandidatePlacement = () => {
  return (
    <div>
      <div className="row mt-5">
        <div className="col-md-6 Emp-subContainer">
          <h1>The Right Candidate At Your Fingertips</h1>
          <p>
            Pre-screening, AI-powered stack ranking and easy outreach gives you
            a jump on competitors.
          </p>
          <span>
            You often have a very short time to present candidates, and
            sometimes only a limited number. Let Glider’s AI-powered matching
            engine stack rank your candidates so you can focus on the most
            qualified for the placement. Then use our candidate communication
            tools for quick and easy contact follow-up.
          </span>
        </div>
        <div className="col-md-6">
          <img src={Image3} alt="Image1" width="100%" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <img src={Image4} alt="Image1" width="100%" />
        </div>
        <div className="col-md-6 Emp-subContainer">
          <h1>Automate Manual Tasks And Improve Productivity</h1>
          <p>
            Don’t waste time manually screening resumes, contacting candidates
            and interviewing unqualified candidates.
          </p>
          <span>
            Reading resumes, screening potential candidates and doing technical
            interviews take hours of your team’s time when they could be working
            for clients. Glider automates many manual tasks and puts the power
            to effectively screen technical candidates into the recruiters hands
            with auto-scored, real-world coding tasks. So you know which
            candidates to focus your time on.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CandidatePlacement;
