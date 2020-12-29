import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Team from "./Team";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import UserContext from "../../context/UserContext";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    document.title = "Team Members";
    async function getTeam() {
      const teamData = await axios.get("http://localhost:5000/addTeam/", {
        headers: { "x-auth-token": userData.token },
      });
      setTeamMembers(teamData.data);
      setIsLoading(false);
    }
    getTeam();
  }, [userData]);
  console.log("Team", teamMembers);

  const deleteMember = (id) => {
    axios.delete("http://localhost:5000/addTeam/" + id, {
      headers: { "x-auth-token": userData.token },
    });

    setTeamMembers(teamMembers.filter((el) => el._id !== id));
  };

  const teamMemberData = () => {
    return teamMembers.map((team, i) => {
      console.log(team);
      return <Team team={team} key={i} deleteMember={deleteMember} />;
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-10">
          <h1>Team Members</h1>
        </div>
        <div className="col-md-2">
          <Link to="/addTeam" className="btn btn-success btn-lg btn-block">
            Add Member
          </Link>
        </div>
      </div>
      <div className="table-container">
        <h3>Team</h3>
        <p>Invite and manage team members</p>
        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{teamMemberData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
