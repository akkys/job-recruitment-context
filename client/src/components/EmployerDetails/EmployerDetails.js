import React, { useEffect } from "react";
import HiringProcess from "./HiringProcess";
import Learning from "./Learning";

const EmployerDetails = () => {
  useEffect(() => {
    document.title = "Recruiting Employers: Job Recruiter";
  });
  return (
    <div>
      <div className="container Emp-container">
        <h1>
          All You Need To Hire Qualified Candidates Faster And Continue To
          Develop Them
        </h1>
        <div className="row">
          <div className="col-md-6 left">
            <h3>Recruiting Solutions</h3>
            <p>
              Find your most qualified candidates faster with AI-powered stack
              ranking, video interviews and real-world job simulations.
            </p>
          </div>
          <div className="col-md-6 left">
            <h3>L & D Solutions</h3>
            <p>
              Make sure your team keeps their skills sharp by identifying and
              addressing knowledge gaps.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <HiringProcess />
        <Learning />
      </div>
      <div className="container Emp-container">
        <h1>We Helps Companies Hire Better Candidates Faster</h1>
      </div>
    </div>
  );
};

export default EmployerDetails;
