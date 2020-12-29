import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorAlert from "../misc/ErrorAlert";
import SuccessAlert from "../misc/SuccessAlert";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        email,
        password,
      };

      const loginRes = await Axios.post(
        "http://localhost:5000/user/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      // alert(`Welcome ${loginRes.data.user.name} ! You are now logged in`);
      setSuccess(`Welcome ${loginRes.data.user.name} ! You are now logged in.`);
      // history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const clearSuccess = () => {
    setSuccess(undefined);

    history.push("/welcome");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>

        <form onSubmit={handleSubmit} className="col-md-6" id="login-container">
          <h1>
            Sign-In
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
            <SuccessAlert message={success} clearSuccess={clearSuccess} />
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-md btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
