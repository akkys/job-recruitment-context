import React from "react";
import Image2 from "./img/image2.jpg";

const Learning = () => {
  return (
    <div className="row Emp-subContainer" style={{ marginTop: "5%" }}>
      <div className="col-md-6">
        <img src={Image2} alt="Image2" width="100%" height="80%" />
      </div>
      <div className="col-md-6">
        <h1>Learning & Development Solutions</h1>
        <p>
          Make sure your team keeps up with the pace of change by developing new
          skills. Identify skill gaps, monitor the effectiveness of your
          learning programs and support a merit-based promotion culture.
        </p>
      </div>
    </div>
  );
};

export default Learning;
