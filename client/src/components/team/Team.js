import React from "react";
import { Link } from "react-router-dom";

const Team = (props) => {
  const { team } = props;
  return (
    <tr className="table-secondary">
      <th scope="row">{team.name}</th>
      <td>{team.phone}</td>
      <td>{team.email}</td>
      <td>{team.role}</td>
      <td>
        <Link
          to={"/editTeam/" + team._id}
          style={{ textDecoration: "none", color: "green" }}
        >
          <i className="fa fa-pencil-square-o fa-lg" />
        </Link>
      </td>
      <td>
        <Link
          to="/team"
          onClick={() => {
            props.deleteMember(team._id);
          }}
          style={{ color: "red" }}
        >
          <i className="fa fa-times fa-lg" />
        </Link>
      </td>
    </tr>
  );
};

export default Team;
