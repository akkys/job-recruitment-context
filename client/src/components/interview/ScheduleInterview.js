import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../misc/ErrorAlert";
import UserContext from "../../context/UserContext";

const ScheduleInterview = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [inttype, setInttype] = useState("");
  const [interviewType, setInterviewType] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);

  useEffect(() => {
    document.title = "Shedule Interview: Job-Recruitment";
    async function getInterviewTypes() {
      const interviewTypeData = await axios.get(
        "http://localhost:5000/intType/"
      );
      if (interviewTypeData.data.length > 0) {
        return (
          setInterviewType(
            interviewTypeData.data.map((inttypes) => inttypes.inttype)
          ),
          setInttype(interviewTypeData.data[0].inttype)
        );
      }
    }
    getInterviewTypes();
  }, []);
  console.log(interviewType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const interviews = {
        name,
        email,
        date,
        interviewer,
        inttype,
        status,
      };
      console.log(interviews);

      await axios.post("http://localhost:5000/schedule/add", interviews, {
        headers: { "x-auth-token": userData.token },
      });
      // setInttype("");
      // setName("");
      // setEmail("");
      // setDate("");
      // setInterviewer("");
      history.push("/interviewList");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="container ">
      <div className="row mb-5">
        <div className="col-md-3"></div>
        <div className="col-md-6 form-container">
          {error && (
            <ErrorAlert
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">
              Schedule New Interview{" "}
              <Link
                to="/interviewList"
                type="submit"
                className="btn btn-dark btn-md"
                style={{ float: "right" }}
              >
                Back
              </Link>
            </h2>
            <hr />
            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Interview Type</label>
                  <select
                    className="form-control"
                    value={inttype}
                    onChange={(e) => setInttype(e.target.value)}
                  >
                    {interviewType.map((inttype) => {
                      return (
                        <option key={inttype} value={inttype}>
                          {inttype}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Candidate Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Candidate Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Interviewer</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Interviewer Name"
                    value={interviewer}
                    onChange={(e) => setInterviewer(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-md float-right"
            >
              Schedule Interview
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;
