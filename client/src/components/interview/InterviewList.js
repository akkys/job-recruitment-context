import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Interview from "./Interview";
import Loading from "../Loading";
import UserContext from "../../context/UserContext";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    document.title = "Live Interviews: Job-Recruitment";
    async function getInterviewData() {
      const interviewData = await axios.get("http://localhost:5000/schedule/", {
        headers: { "x-auth-token": userData.token },
      });
      setInterviews(interviewData.data);
      setIsLoading(false);
      console.log(interviewData);
    }
    getInterviewData();
  }, [userData]);
  console.log("Interview", interviews);

  const deleteInterview = (id) => {
    axios.delete("http://localhost:5000/schedule/" + id, {
      headers: { "x-auth-token": userData.token },
    });

    setInterviews(interviews.filter((el) => el._id !== id));
  };

  const interviewList = () => {
    return interviews.map((interview, i) => {
      return (
        <Interview
          interview={interview}
          key={i}
          deleteInterview={deleteInterview}
        />
      );
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-10">
          <h1>Live Interviews</h1>
        </div>
        <div className="col-md-2">
          <Link
            to="/scheduleInterview"
            className="btn btn-primary btn-lg btn-block"
          >
            Schedule
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-container">
          <thead className="table-active">
            <tr>
              <th scope="col">Candidate</th>
              <th scope="col">Email</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Interviewers</th>
              <th scope="col">Interview Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{interviewList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewList;
