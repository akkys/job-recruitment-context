import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../misc/ErrorAlert";
import UserContext from "../../context/UserContext";

const AddTeamMember = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEamil] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);

  useEffect(() => {
    document.title = "Add Team Member";
    async function getRole() {
      const roleData = await axios.get("http://localhost:5000/addRole/");
      if (roleData.data.length > 0) {
        return (
          setRoles(roleData.data.map((r) => r.role)),
          setRole(roleData.data[0].role)
        );
      }
    }
    getRole();
    console.log(roles, role);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const team = {
        name,
        role,
        email,
        phone,
      };
      // console.log(team);

      await axios.post("http://localhost:5000/addTeam/add", team, {
        headers: { "x-auth-token": userData.token },
      });
      setName("");
      setRole("");
      setEamil("");
      setPhone("");
      history.push("/team");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-3"></div>
        <div className="col-md-6 form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">
              Add Team Member{" "}
              <Link
                to="/team"
                type="submit"
                className="btn btn-dark btn-md"
                style={{ float: "right" }}
              >
                Back
              </Link>
            </h2>
            <hr />
            {error && (
              <ErrorAlert
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role, i) => {
                  return <option key={i}>{role}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEamil(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-md float-right"
            >
              Add Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
