import React from "react";
import { Link } from "react-router-dom";

const ProjectsDetails = (props) => {
  const { project } = props;
  console.log("Projects", project);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  });
  const fromDt = project.fromDate;
  const fromDate = formatter.format(Date.parse(fromDt));

  const toDt = project.toDate;
  const toDate = formatter.format(Date.parse(toDt));

  const technologies = project.technologies.map((tech, i) => {
    return (
      <small className="tags" key={i}>
        {tech}
      </small>
    );
  });

  return (
    <div className="sample-container">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-6">
              <h5>{project.title}</h5>
            </div>
            <div className="col-md-6">
              <span>
                {fromDate} - {toDate}
                <Link
                  to={"/updateProjectDetails/" + project._id}
                  className="ml-3"
                >
                  <i className="fa fa-pencil-square-o fa-lg text-success" />
                </Link>
              </span>
              <span
                className="float-right"
                style={{ cursor: "pointer", color: "gray" }}
                onClick={() => props.deleteExperience(project._id)}
              >
                Remove
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h6>{project.summary}</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-12">{technologies}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-12">{project.description}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-12">{project.contribution}</div>
          </div>

          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetails;
