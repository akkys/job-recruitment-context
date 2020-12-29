import React from "react";
import Image1 from "./img/image1.jpg";

const HiringProcess = () => {
  return (
    <div className="row Emp-subContainer">
      <div className="col-md-6">
        <h1>Streamline Your Hiring Process</h1>
        <h3>Reduce Time To Hire</h3>
        <p>
          Identify the top candidates, engage with them and close positions
          faster.
        </p>
        <h3>Save Time</h3>
        <p>
          Filter out candidates who are not qualified at the top of your funnel.
          Reduce the number of interviews and save hiring manager time.
        </p>
        <h3>Make It Consistent</h3>
        <p>
          Standardize your hiring bar using our assessments and standardized
          interview tasks.
        </p>
        <h3>Reduce Bias</h3>
        <p>
          Reduce conscious and unconscious bias by standardizing your screening
          process.
        </p>
        <h3>Improve Candidate Experience</h3>
        <p>By clearly defining hiring criteria and sticking to it.</p>
      </div>
      <div className="col-md-6">
        <img
          src={Image1}
          alt="Image1"
          width="100%"
          height="90%"
          //   style={{ paddingTop: "10%" }}
        />
      </div>
    </div>
  );
};

export default HiringProcess;
