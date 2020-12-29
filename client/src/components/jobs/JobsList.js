import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const JobsList = (props) => {
  const { job } = props;

  const [apply, setApply] = useState(true);

  const { userData } = useContext(UserContext);
  //   var date = job.createAt;
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const created = job.createdAt;
  const createdDate = formatter.format(Date.parse(created));

  //   const createdDate = created.toLocaleDateString("en-US");

  const languagesList = job.languages.map((lang, i) => {
    return (
      <span className="tags" key={i}>
        {lang}
      </span>
    );
  });

  const toolsList = job.tools.map((tool, i) => {
    return (
      <span className="tags" key={i}>
        {tool}
      </span>
    );
  });

  return (
    <>
      <div className="job-container container">
        <div className="row">
          <div className="col-md-6">
            {job.length}
            <h6 className="text-primary" style={{ fontSize: "17px" }}>
              <span>{job.companyName}</span>

              {userData.user.category === "Employer" && (
                <Link to={`/editJob/` + job._id}>
                  <i className="fa fa-pencil-square-o text-success ml-3" />
                </Link>
              )}
            </h6>
            <h5>{job.position}</h5>
            <h6>
              Role : {job.role} | Level : {job.level} | Experience{" "}
              <small>(in years)</small> : {job.experience}yrs
            </h6>

            <small>
              <i className="fa fa-circle-o ml-2 mr-1" />
              {job.contract}
            </small>
            <small>
              <i className="fa fa-circle-o ml-2 mr-1" />
              <i className="fa fa-inr ml-1 mr-1" />
              {job.minSalary}L - <i className="fa fa-inr ml-1 mr-1" />
              {job.maxSalary}L
            </small>
            <small>
              <i className="fa fa-circle-o ml-2 mr-1" />
              {job.location}
            </small>
          </div>
          <div className="col-md-6 ">
            <h4>
              Requirements :{" "}
              {userData.user.category === "Employer" && (
                <i
                  className="fa fa-trash text-danger float-right"
                  onClick={() => props.deleteJob(job._id)}
                />
              )}
            </h4>
            <div className="row">
              <div className="col-md-3">
                <h6>Languages </h6>
              </div>
              <div className="col-md-9">
                <h6 className="mb-3"> {languagesList}</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <h6>Tools </h6>
              </div>
              <div className="col-md-9">
                <h6 className="">{toolsList}</h6>
              </div>
            </div>
            <div className="text-secondary float-right mt-3">
              <small>Posted on : {createdDate}</small>
              {userData.user.category === "Candidate" && (
                <button
                  className="btn btn-success btn-sm ml-3 float-right"
                  onClick={() => setApply(!apply)}
                >
                  {apply ? "Apply" : "Applied"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsList;
