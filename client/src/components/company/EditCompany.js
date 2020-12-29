import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorAlert from "../misc/ErrorAlert";
import { Link } from "react-router-dom";

const EditCompany = (props) => {
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

  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function getCompanyData() {
      const companyData = await Axios.get(
        "http://localhost:5000/cmpReg/" + props.match.params.id,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setFullName(companyData.data.fullname);
      setEmail(companyData.data.email);
      setCategory(companyData.data.category);
      setStreet1(companyData.data.street1);
      setStreet2(companyData.data.street2);
      setCity(companyData.data.city);
      setState(companyData.data.state);
      setCountry(companyData.data.country);
      setZipcode(companyData.data.zipcode);
    }
    getCompanyData();
  }, [props.match.params.id, userData]);

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

      Axios.post(
        "http://localhost:5000/cmpReg/update/" + props.match.params.id,
        company,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setFullName("");
      setEmail("");
      setCategory("");
      setStreet1("");
      setStreet2("");
      setCity("");
      setState("");
      setCountry("");
      setZipcode("");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div id="" className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6 form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">
            Update Company Details{" "}
            <Link
              to="/companyDetails"
              className="btn btn-md btn-dark float-right"
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
            className="btn btn-md btn-primary mt-4 float-right"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
