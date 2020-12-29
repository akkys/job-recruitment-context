import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ cand, name }) => {
  console.log("Profile", cand);
  const roles = cand.roles.map((role, i) => {
    return (
      <small key={i} className="tags">
        {role}
      </small>
    );
  });

  const locations = cand.locations.map((loc, i) => {
    return (
      <small key={i} className="tags">
        {loc}
      </small>
    );
  });

  const skills = cand.skills.map((skill, i) => {
    return (
      <small key={i} className="tags">
        {skill}
      </small>
    );
  });

  return (
    <div className="sample-container container mb-4">
      <div className="row">
        <div className="col-md-10">
          {cand._id ? <h3>{cand.name}</h3> : <h3>{name}</h3>}
        </div>
        <div className="col-md-2">
          {cand._id ? (
            <Link
              className="btn btn-success btn-md "
              to={"/updateProfileDetails/" + cand._id}
            >
              Update Details
            </Link>
          ) : (
            <Link
              className="btn btn-success btn-md "
              to={"/addProfileDetails/"}
            >
              Add Details
            </Link>
          )}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h5>{cand.miniResume}</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <p>
            <i className="fa fa-tag mr-2" />
            {roles}
          </p>
        </div>
        <div className="col-md-5">
          <p>
            <i className="fa fa-map-marker mr-2 " />
            {locations}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <label className="mr-2">SKILLS :</label>
          {skills}
        </div>
      </div>
    </div>
  );
};

export default Profile;
