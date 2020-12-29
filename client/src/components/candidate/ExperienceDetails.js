import React from "react";
import { Link } from "react-router-dom";

const ExperienceDetails = (props) => {
  const { exp } = props;
  console.log("Exp", exp);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  });
  const fromDt = props.exp.fromDate;
  const fromDate = formatter.format(Date.parse(fromDt));

  const toDt = exp.toDate;
  const toDate = formatter.format(Date.parse(toDt));

  return (
    <div className="sample-container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h6>
            {exp.cmpName}
            <Link to={"/updateExperienceDetails/" + exp._id} className="ml-3">
              <i className="fa fa-pencil-square-o fa-lg text-success" />
            </Link>
            <span
              className="float-right"
              style={{ cursor: "pointer", color: "gray" }}
              onClick={() => props.deleteExperience(exp._id)}
            >
              Remove
            </span>
          </h6>
          <h5>
            {exp.role}{" "}
            <span>
              {fromDate} - {toDate}
            </span>
          </h5>{" "}
          <p>{exp.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
