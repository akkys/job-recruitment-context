import React from "react";
import { Link } from "react-router-dom";

const Interview = (props) => {
  const { interview } = props;

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const created = interview.date;
  const createdDate = formatter.format(Date.parse(created));

  return (
    <tr className="table-secondary">
      <th scope="row">{interview.name}</th>
      <td>{interview.email}</td>
      <td>{createdDate}</td>
      <td>{interview.interviewer}</td>
      <td>{interview.inttype}</td>
      <td>
        {interview.status === "Completed" ? (
          <span className="text-danger">{interview.status}</span>
        ) : (
          <span className="text-success">{interview.status}</span>
        )}{" "}
      </td>
      <td>
        <Link
          to={"/editInterview/" + interview._id}
          style={{ textDecoration: "none", color: "green" }}
        >
          <i className="fa fa-pencil-square-o fa-lg mr-3" />
        </Link>
        <Link
          to=""
          onClick={() => {
            props.deleteInterview(interview._id);
          }}
          style={{ color: "red" }}
        >
          <i className="fa fa-times fa-lg" />
        </Link>
      </td>
    </tr>
  );
};

export default Interview;
