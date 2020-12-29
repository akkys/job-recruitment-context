import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../misc/ErrorAlert";
import UserContext from "../../context/UserContext";

const UpdateJob = (props) => {
  const history = useHistory();
  const [id] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [contract, setContract] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState("");
  const [error, setError] = useState("");

  const { userData } = useContext(UserContext);
  //   console.log(userData);

  const contractTypes = [
    { contract: "Full-Time" },
    { contract: "Part-Time" },
    { contract: "Full-Time, Remote" },
    { contract: "Part-Time, Remote" },
    { contract: "Only Remote" },
  ];

  const experiences = [
    { experience: "1" },
    { experience: "2" },
    { experience: "3" },
    { experience: "4" },
    { experience: "5" },
    { experience: "5+" },
  ];

  useEffect(() => {
    async function getJob() {
      const jobList = await Axios.get(
        "http://localhost:5000/jobList/" + props.match.params.id,
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      console.log(jobList.data);
      setCompanyName(jobList.data.companyName);
      setPosition(jobList.data.position);
      setRole(jobList.data.role);
      setLevel(jobList.data.level);
      setLocation(jobList.data.location);
      setContract(jobList.data.contract);
      setLanguages(jobList.data.languages);
      setTools(jobList.data.tools);
      setMinSalary(jobList.data.minSalary);
      setMaxSalary(jobList.data.maxSalary);
      setExperience(jobList.data.experience);
    }
    getJob();
  }, [props.match.params.id, userData]);

  const addLanguage = () => {
    if (language) {
      setLanguages((languages) => [...languages, language]);
      setLanguage("");
    } else {
      return null;
    }
  };

  const deleteLanguage = (index) => {
    const deletedLanguage = languages.filter((lang) => lang !== index);
    setLanguages(deletedLanguage);
  };

  const addTools = () => {
    if (tool) {
      setTools((tools) => [...tools, tool]);
      setTool("");
    } else {
      return null;
    }
  };

  const deleteTools = (index) => {
    const deletedTool = tools.filter((tool) => tool !== index);
    setTools(deletedTool);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        _id: id,
        companyName,
        position,
        role,
        level,
        location,
        contract,
        languages,
        tools,
        minSalary,
        maxSalary,
        experience,
      };
      console.log(newJob);

      await Axios.post(
        "http://localhost:5000/jobList/update/" + props.match.params.id,
        newJob,
        {
          headers: { "x-auth-token": userData.token },
        }
      );

      history.push("/jobList");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="row mb-5">
      <div className="col-md-3"></div>
      <div className="col-md-6 form-container">
        {error && (
          <ErrorAlert message={error} clearError={() => setError(undefined)} />
        )}
        <h2 className="mb-4">
          Update Job{" "}
          <Link to="/jobList" className="btn btn-dark mt-1 float-right">
            Back
          </Link>
        </h2>

        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="companyName">
              Company Name
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="position">
              Position
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="role">
              Role
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="level">
              level
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="location">
              Location
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="contract">
              Contract
            </label>
            <div className="col-md-9">
              {/* <input
                type="text"
                className="form-control"
                name="contract"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              /> */}
              <select
                className="form-control"
                onChange={(e) => setContract(e.target.value)}
              >
                {contractTypes.map(({ contract }) => {
                  return (
                    <option key={contract} name={contract} value={contract}>
                      {contract}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="laguage">
              Languages
            </label>
            <div className="col-md-9">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Languages Required"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <div className="input-group-append">
                  <span
                    onClick={addLanguage}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <i className="fa fa-plus" />
                  </span>
                </div>
              </div>
              <small>
                {languages.map((lang, i) => (
                  <span className="add-tags" key={i}>
                    {lang}{" "}
                    <span onClick={() => deleteLanguage(lang)}>
                      <i className="fa fa-times ml-1" />
                    </span>
                  </span>
                ))}
              </small>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-3" htmlFor="tool">
              Tools
            </label>
            <div className="col-md-9">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Tools Required"
                  name="tool"
                  value={tool}
                  onChange={(e) => setTool(e.target.value)}
                />
                <div className="input-group-append">
                  <span
                    onClick={addTools}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                </div>
              </div>
              {tools.length === null ? (
                <small></small>
              ) : (
                <small>
                  {tools.map((tool, i) => (
                    <span className="add-tags" key={i}>
                      {tool}{" "}
                      <span onClick={() => deleteTools(tool)}>
                        <i className="fa fa-times ml-1" />
                      </span>
                    </span>
                  ))}
                </small>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="minSalary">
              CTC / year <small>(in Lakhs)</small>
            </label>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="minSalary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Min"
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="maxSalary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3" htmlFor="experience">
              Experience <small>(in Years)</small>
            </label>
            <div className="col-md-2">
              {/* <input
                type="text"
                className="form-control"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="in years"
              /> */}
              <select
                className="form-control"
                onChange={(e) => setExperience(e.target.value)}
              >
                {experiences.map(({ experience }) => {
                  return (
                    <option
                      key={experience}
                      name={experience}
                      value={experience}
                    >
                      {experience}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-5 float-md-right">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
