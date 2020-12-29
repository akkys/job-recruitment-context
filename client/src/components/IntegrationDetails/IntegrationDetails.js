import React from "react";
import Image1 from "./img/image1.jpg";
import Image2 from "./img/image2.jpg";
import Compliance from "./Compliance";

const IntegrationDetails = () => {
  return (
    <div className="container home-container">
      <div className="row mt-5">
        <div className="col-md-6 Emp-subContainer">
          <h1>Compliance</h1>
          <p>
            Job Recruiter is compliant with all major industry standards
            including EEO, ADA, Data Privacy and SOC 2. Our team constantly
            works with users as well as legal experts to ensure compliance with
            these standards.
          </p>
        </div>
        <div className="col-md-6">
          <img src={Image1} alt="Image1" width="100%" height="80%" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <img src={Image2} alt="Image1" width="100%" height="90%" />
        </div>
        <div className="col-md-6 Emp-subContainer">
          <h1>EEO Disclosure</h1>
          <p>
            The EEO or Equal Employment Opportunity is part of Title VII of the
            Civil Rights Act, covered by the Equal Employment Opportunity
            Commission or EEOC. The EEOC is an agency of the federal government
            that protects employees from being discriminated against and offer
            equal work opportunities based on skill, irrespective of their
            gender, race, ethnicity or disability status. <br />
            <br />
            In Job Recruiter, Information to self-identification and disability
            status is optional and candidates can choose to not disclose their
            status.
          </p>
        </div>
      </div>
      <div className="row Emp-subContainer mt-5">
        <div className="col-md-4">
          <h1>Job Recruiter Declaration</h1>
        </div>
        <div className="col-md-8">
          <p>
            Job Recruiter incorporates a specific declaration page to assure
            every candidate that the data received through any medium is 100%
            safe and private. The declaration page also pledges not to judge the
            candidates during the interview process based on the discrete data
            provided. Every bit of data pertaining to status, gender, ethnicity,
            and disability are procured solely with the candidate’s consent.
          </p>
        </div>
      </div>
      <Compliance />
    </div>
  );
};

export default IntegrationDetails;
