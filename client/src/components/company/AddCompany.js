import Axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorAlert from "../misc/ErrorAlert";

const AddCompany = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const company = {
        fullname,
        email,
        category,
        street1,
        street2,
        city,
        state,
        country,
        zipcode,
      };

      Axios.post("http://localhost:5000/cmpReg/add", company, {
        headers: { "x-auth-token": userData.token },
      });
      // setFullName("");
      // setEmail("");
      // setCategory("");
      // setStreet1("");
      // setStreet2("");
      // setCity("");
      // setState("");
      // setCountry("");
      // setZipcode("");
      history.push("/companyDetails");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="home-container row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5">Add Company Details</h2>
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
              placeholder="Enter Proprietor Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Company Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Proprietor Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Street Address Line1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Street Address Line1 "
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Street Address Line2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Street Address Line2"
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>ZipCode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter ZipCode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-md btn-primary btn-block mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
