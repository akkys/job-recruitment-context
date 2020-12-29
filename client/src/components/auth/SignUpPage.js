import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorAlert from "../misc/ErrorAlert";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [cmpName, setCmpName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name,
        cmpName,
        email,
        password,
        passwordCheck,
        category,
      };
      await Axios.post("http://localhost:5000/user/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      setSuccess(
        `Congratulations ${loginRes.data.user.name}! You are successfully registered.`
      );
      // history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const clearSuccess = () => {
    setSuccess(undefined);
    history.push("/home");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>

        <form onSubmit={handleSubmit} className="col-md-6" id="login-container">
          <h1>
            Sign-Up
            <span>
              <Link to="/" className="btn btn-secondary btn-md float-right">
                Home
              </Link>
            </span>
          </h1>

          <hr />
          <br />
          {error && (
            <ErrorAlert
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={clearSuccess}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Registered As</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Candidate">Candidate</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          {category === "Employer" && (
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                value={cmpName}
                onChange={(e) => setCmpName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-md btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
