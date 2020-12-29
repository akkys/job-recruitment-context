import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorAlert from "../misc/ErrorAlert";

const AddProfileDetails = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [miniResume, setMiniResume] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [userName, setUsername] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);

  const addSkills = () => {
    if (skill) {
      setSkills((skills) => [...skills, skill]);
      setSkill("");
    } else {
      return null;
    }
  };

  const deleteSkill = (index) => {
    const deletedSkill = skills.filter((skill) => skill !== index);
    setSkills(deletedSkill);
  };

  const addRole = () => {
    if (role) {
      setRoles((roles) => [...roles, role]);
      setRole("");
    } else {
      return null;
    }
  };

  const deleteRole = (index) => {
    const deletedrole = roles.filter((role) => role !== index);
    setRoles(deletedrole);
  };

  const addLocation = () => {
    if (location) {
      setLocations((locations) => [...locations, location]);
      setLocation("");
    } else {
      return null;
    }
  };

  const deleteLocation = (index) => {
    const deletedLocaction = locations.filter((loc) => loc !== index);
    setLocations(deletedLocaction);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        name,
        userName,
        roles,
        locations,
        skills,
        miniResume,
      };

      await Axios.post("http://localhost:5000/candidate/add", profileData, {
        headers: { "x-auth-token": userData.token },
      });
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
          Candidate Profile Details
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
            <label className="col-md-3">Full Name</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="form-group row">
            <label className="col-md-3">Username</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="userName"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3">Mini Resume</label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="miniResume"
                value={miniResume}
                onChange={(e) => setMiniResume(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="contract">
              Roles
            </label>
            <div className="col-md-9">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="input-group-append">
                  <span
                    onClick={addRole}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                </div>
              </div>
              {roles.length === null ? (
                <small></small>
              ) : (
                <small>
                  {roles.map((role, i) => (
                    <span className="add-tags" key={i}>
                      {role}{" "}
                      <span onClick={() => deleteRole(role)}>
                        <i className="fa fa-times ml-1" />
                      </span>
                    </span>
                  ))}
                </small>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="contract">
              Location
            </label>
            <div className="col-md-9">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="input-group-append">
                  <span
                    onClick={addLocation}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                </div>
              </div>
              {locations.length === null ? (
                <small></small>
              ) : (
                <small>
                  {locations.map((loc, i) => (
                    <span className="add-tags" key={i}>
                      {loc}{" "}
                      <span onClick={() => deleteLocation(loc)}>
                        <i className="fa fa-times ml-1" />
                      </span>
                    </span>
                  ))}
                </small>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3">Skills</label>
            <div className="col-md-9">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
                <div className="input-group-append">
                  <span
                    onClick={addSkills}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                </div>
              </div>
              {skills.length === null ? (
                <small></small>
              ) : (
                <small>
                  {skills.map((skill, i) => (
                    <span className="add-tags" key={i}>
                      {skill}{" "}
                      <span onClick={() => deleteSkill(role)}>
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

export default AddProfileDetails;
