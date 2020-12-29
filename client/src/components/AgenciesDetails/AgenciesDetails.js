import React, { useEffect } from "react";
import WorkAgency from "./WorkAgency";
import CandidatePlacement from "./CandidatePlacement";

const AgenciesDetails = () => {
  useEffect(() => {
    document.title = "Recruiting Agency : Job Recruiter";
  });

  return (
    <div className="container  mb-5">
      <div className="row Agency-container">
        <div className="col-md-3">
          <h3>Work with MSP’s</h3>
          <p>
            Integrate with leading MSP’s already using Glider for screening
            candidates.
          </p>
        </div>
        <div className="col-md-3">
          <h3>Increase placement rate</h3>
          <p>
            Better qualified talent impresses your clients and leads to more
            placements.
          </p>
        </div>
        <div className="col-md-3">
          <h3>Immediately find the right candidate</h3>
          <p>
            Artificial intelligence ranks candidates so you can work with the
            most qualified immediately.
          </p>
        </div>
        <div className="col-md-3">
          <h3>Save time</h3>
          <p>
            Superpowers for recruiters to quickly and effectively screen and
            contact technical candidates.
          </p>
        </div>
      </div>
      <WorkAgency />
      <CandidatePlacement />
    </div>
  );
};

export default AgenciesDetails;
