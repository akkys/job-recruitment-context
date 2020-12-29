import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Loading from "../Loading";
import CompanyProfile from "./CompanyProfile";

const CompanyDetails = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);
  console.log(userData);

  useEffect(() => {
    document.title = "Company Details: Job-Recruitment";

    async function getCompanyData() {
      const companyData = await Axios.get("http://localhost:5000/cmpReg/", {
        headers: { "x-auth-token": userData.token },
      });
      setCompany(companyData.data);
      setLoading(false);
    }
    getCompanyData();
  }, [userData]);
  console.log("Company", company);

  return loading ? (
    <Loading />
  ) : (
    <div className="home-container container">
      <div className="row">
        <div className="col-md-10">
          {userData.user && <h1>{userData.user.cmpName}</h1>}
        </div>
        {company.length === 0 ? (
          <Link to="/addCompany" className="btn btn-lg btn-primary float-right">
            Add Details
          </Link>
        ) : (
          <>
            {company.map((comp, i) => {
              return (
                <Link
                  to={"/editCompany/" + comp._id}
                  className="btn btn-lg btn-success float-right"
                >
                  Update Details
                </Link>
              );
            })}
          </>
        )}
        {/* {company.map((comp) => {
          return (
            <div className="col-md-2" key={comp._id}>
              {comp._id ? (
                <Link
                  to={"/editCompany/" + comp._id}
                  className="btn btn-lg btn-success float-right"
                >
                  Update Details
                </Link>
              ) : (
                <Link
                  to="/addCompany"
                  className="btn btn-lg btn-primary float-right"
                >
                  Add Details
                </Link>
              )}
            </div>
          );
        })} */}
      </div>
      {company.map((comp) => {
        return <CompanyProfile comp={comp} key={comp._id} />;
      })}
    </div>
  );
};

export default CompanyDetails;
