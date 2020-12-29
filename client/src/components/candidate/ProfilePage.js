import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ExperienceDetails from "./ExperienceDetails";
import Profile from "./Profile";
import ProjectsDetails from "./ProjectsDetails";

const ProfilePage = () => {
  const [candidate, setCandidate] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function getCandidateData() {
      const candidateData = await Axios.get(
        "http://localhost:5000/candidate/",
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setCandidate(candidateData.data);
      setIsLoading(false);
    }
    getCandidateData();
  }, [userData]);

  useEffect(() => {
    async function getExperienceData() {
      const experienceData = await Axios.get(
        "http://localhost:5000/experience/",
        {
          headers: { "x-auth-token": userData.token },
        }
      );
      setExperience(experienceData.data);
      setIsLoading(false);
    }
    getExperienceData();
  }, [userData]);

  const deleteExperience = async (id) => {
    await Axios.delete("http://localhost:5000/experience/" + id, {
      headers: { "x-auth-token": userData.token },
    });
    setExperience(experience.filter((exp) => exp._id !== id));
  };

  useEffect(() => {
    async function getProjectData() {
      const projectData = await Axios.get("http://localhost:5000/projects/", {
        headers: { "x-auth-token": userData.token },
      });
      setProjects(projectData.data);
      setIsLoading(false);
    }
    getProjectData();
  }, [userData]);

  const deleteProject = async (id) => {
    await Axios.delete("http://localhost:5000/projects/" + id, {
      headers: { "x-auth-token": userData.token },
    });
    setProjects(projects.filter((project) => project._id !== id));
  };

  const name = userData.user && <div>{userData.user.name}</div>;

  const profileData = candidate.map((cand, i) => {
    return <Profile cand={cand} key={i} name={name} />;
  });
  // console.log("Profile", profileData);

  const experienceData = experience.map((exp, i) => {
    return (
      <ExperienceDetails
        exp={exp}
        key={i}
        deleteExperience={deleteExperience}
      />
    );
  });

  const projectsData = projects.map((project, i) => {
    return (
      <ProjectsDetails
        project={project}
        key={i}
        deleteProject={deleteProject}
      />
    );
  });

  return isLoading ? (
    <div className="home-container">Loading...</div>
  ) : (
    <div className="home-container container mb-5">
      {candidate.length === 0 && (
        <>
          <h3>{name}</h3>
          <Link
            className="btn btn-success btn-md float-right"
            to={"/addProfileDetails/"}
          >
            Add Details
          </Link>
        </>
      )}
      {profileData}
      <div className="sample-container">
        <h4>
          EXPERIENCE
          <Link
            to="/addExperienceDetails"
            className="btn btn-primary btn-md float-right mr-2"
          >
            Add
          </Link>
        </h4>
        {experienceData}
      </div>
      <div className="sample-container mt-4">
        <h4>
          PROJECTS
          <Link
            to="/addProjectDetails"
            className="btn btn-primary btn-md float-right mr-2"
          >
            Add
          </Link>
        </h4>
        {projectsData}
      </div>
    </div>
  );
};

export default ProfilePage;
