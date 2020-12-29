import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../misc/ErrorAlert";
import UserContext from "../../context/UserContext";

const UpdateExperienceDetails = (props) => {
  const history = useHistory();
  const [id] = useState("");
  const [cmpName, setCmpName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function getExperienceData() {
      const experienceData = await Axios.get(
        "http://localhost:5000/experience/" + props.match.params.id,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setCmpName(experienceData.data.cmpName);
      setRole(experienceData.data.role);
      setDescription(experienceData.data.description);
      setFromDate(experienceData.data.fromDate);
      setToDate(experienceData.data.toDate);
    }
    getExperienceData();
  }, [props.match.params.id, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExperience = {
        _id: id,
        cmpName,
        role,
        description,
        fromDate,
        toDate,
      };

      await Axios.post(
        "http://localhost:5000/experience/update/" + props.match.params.id,
        newExperience,
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
          Candidate Experience Details
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
            <label className="col-md-3">Role</label>
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
            <label className="col-md-3">Experience</label>
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
          <button type="submit" className="btn btn-success btn-md float-right">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExperienceDetails;
