import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorAlert from "../misc/ErrorAlert";

const UpdateProjectDetails = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [cmpName, setCmpName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [role, setRole] = useState("");
  const [contribution, setContribution] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [technology, setTechnology] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);

  const addTechnologies = () => {
    if (technology) {
      setTechnologies((technologies) => [...technologies, technology]);
      setTechnology("");
    } else {
      return null;
    }
  };

  const deleteTechnology = (index) => {
    const deletedTech = technologies.filter((tech) => tech !== index);
    setTechnologies(deletedTech);
  };

  useEffect(() => {
    async function getProjectDetails() {
      const projectDetails = await Axios.get(
        "http://localhost:5000/projects/" + props.match.params.id,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setTitle(projectDetails.data.title);
      setSummary(projectDetails.data.summary);
      setDescription(projectDetails.data.description);
      setCmpName(projectDetails.data.cmpName);
      setFromDate(projectDetails.data.fromDate);
      setToDate(projectDetails.data.toDate);
      setRole(projectDetails.data.role);
      setContribution(projectDetails.data.contribution);
      setTechnologies(projectDetails.data.technologies);
    }
    getProjectDetails();
  }, [props.match.params.id, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        title,
        summary,
        description,
        cmpName,
        role,
        fromDate,
        toDate,
        contribution,
        technologies,
      };

      await Axios.post(
        "http://localhost:5000/projects/update/" + props.match.params.id,
        newProject,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      history.push("/candidateProfile");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6" id="login-container">
        <h2 className="mb-4">
          Candidate Project Details
          <Link
            to="/candidateProfile"
            className="btn btn-dark mt-1 float-right"
          >
            Back
          </Link>
        </h2>
        <hr />
        {error && (
          <ErrorAlert message={error} clearError={() => setError(undefined)} />
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-md-3">Project Title</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="form-group row">
            <label className="col-md-3">Summary</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3">Description</label>
            <div className="col-md-9">
              <textarea
                type="text"
                className="form-control"
                rows="3"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3">Company Name</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="cmpName"
                value={cmpName}
                onChange={(e) => setCmpName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3">
              When did you work on this project?
            </label>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                name="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3">What was your role?</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group ">
            <label>How did you contribute?</label>
            <div>
              <textarea
                type="text"
                className="form-control"
                name="contribution"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>What technology and tools did you use?</label>
            <div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="technology"
                  value={technology}
                  onChange={(e) => setTechnology(e.target.value)}
                />
                <div className="input-group-append">
                  <span
                    onClick={addTechnologies}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                </div>
              </div>
              {technologies.length === null ? (
                <small></small>
              ) : (
                <small>
                  {technologies.map((tech, i) => (
                    <span className="add-tags" key={i}>
                      {tech}{" "}
                      <span onClick={() => deleteTechnology(tech)}>
                        <i className="fa fa-times ml-1" />
                      </span>
                    </span>
                  ))}
                </small>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-md float-right">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectDetails;
