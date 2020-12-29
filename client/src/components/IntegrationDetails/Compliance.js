import React, { useEffect } from "react";
import Image3 from "./img/image3.jpg";
import Image4 from "./img/image4.jpg";
import Image5 from "./img/image5.jpg";

const Compliance = () => {
  useEffect(() => {
    document.title = "Compliance & Integration: Job Recruiting";
  });

  return (
    <div className="container home-container">
      <div className="row mt-5">
        <div className="col-md-6 Emp-subContainer">
          <h1>ADA Compliance</h1>
          <p>
            Job Recruiter abides by ADA, the Americans with Disabilities Act.
            According to ADA Standards for Accessible Design, published by The
            Department of Justice (DOJ), employers have to offer customized &
            accessible set-ups to individuals with disabilities. Glider is
            considerate towards any special arrangements that is required by
            differently abled candidates and supports their requirements
          </p>
        </div>
        <div className="col-md-6">
          <img src={Image3} alt="Image1" width="100%" height="100%" />
        </div>
      </div>
      <div className="row Emp-subContainer mt-5">
        <div className="col-md-4">
          <h1>Job Recruiter Special Accomomodations</h1>
        </div>
        <div className="col-md-8">
          <p>
            Job Recruiter offers flexibility to accommodate special requests
            such as time extensions. Recruiters are authorised to manually offer
            any setup requested by the candidate with a disability. The
            candidate is kept informed about the status of these requests via
            email.
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <img src={Image4} alt="Image1" width="100%" height="100%" />
        </div>
        <div className="col-md-6 Emp-subContainer">
          <h1>Data Privacy Consent</h1>
          <p>
            Glider monitors the candidate’s activity while they are taking
            assessments to eliminate fraudulent submissions. This requires the
            candidates to share their screen and provide webcam access. We
            follow strict guidelines to seek permissions from candidates and
            candidates have to authorize Glider to access their systems.
          </p>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <div className="col-md-6 Emp-subContainer">
          <h1>Integration</h1>
          <p>
            Job Recruiter securely integrates with existing tools through our
            Open API’s. With Job Recruiter, you can continue working on your
            existing systems without having to login to another application.
          </p>
        </div>
        <div className="col-md-6">
          <img src={Image5} alt="Image1" width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default Compliance;
