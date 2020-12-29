import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import UserContext from "./context/UserContext";
import NavigationBar from "./components/layout/NavigationBar";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import TeamMembers from "./components/team/TeamMembers";
import AddTeamMember from "./components/team/AddTeamMember";
import EditTeamMember from "./components/team/EditTeamMember";
import InterviewList from "./components/interview/InterviewList";
import ScheduleInterview from "./components/interview/ScheduleInterview";
import EditInterview from "./components/interview/EditInterview";
import EmployerDetails from "./components/EmployerDetails/EmployerDetails";
import AgenciesDetails from "./components/AgenciesDetails/AgenciesDetails";
import IntegrationDetails from "./components/IntegrationDetails/IntegrationDetails";
import CompanyDetails from "./components/company/CompanyDetails";
import AddCompany from "./components/company/AddCompany";
import EditCompany from "./components/company/EditCompany";
import AddJob from "./components/jobs/AddJob";
import UpdateJob from "./components/jobs/UpdateJob";
// import JobsList from "./components/jobs/JobListPage";
import JobListPage from "./components/jobs/JobListPage";
import ProfilePage from "./components/candidate/ProfilePage";
import AddProfileDetails from "./components/candidate/AddProfileDetails";
import LandingPage from "./components/pages/LandingPage";
import WelcomPage from "./components/pages/WelcomPage";
import UpdateProfileDetails from "./components/candidate/UpdateProfileDetails";
import AddExperienceDetails from "./components/candidate/AddExperienceDetails";
import UpdateExperienceDetails from "./components/candidate/UpdateExperienceDetails";
import AddProjectDetails from "./components/candidate/AddProjectDetails";
import UpdateProjectDetails from "./components/candidate/UpdateProjectDetails";

const Routers = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      // console.log(tokenRes);
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkedLoggedIn();
  }, []);

  return (
    <div className="">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/welcome" component={WelcomPage} />
            <Route path="/employerDetails" component={EmployerDetails} />
            <Route path="/agenciesDetails" component={AgenciesDetails} />
            <Route path="/integrationDetails" component={IntegrationDetails} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/team" component={TeamMembers} />
            <Route path="/addTeam" component={AddTeamMember} />
            <Route path="/editTeam/:id" component={EditTeamMember} />
            <Route path="/interviewList" component={InterviewList} />
            <Route path="/scheduleInterview" component={ScheduleInterview} />
            <Route path="/editInterview/:id" component={EditInterview} />
            <Route exact path="/companyDetails" component={CompanyDetails} />
            <Route exact path="/addCompany" component={AddCompany} />
            <Route exact path="/editCompany/:id" component={EditCompany} />
            <Route exact path="/addJob" component={AddJob} />
            <Route exact path="/editJob/:id" component={UpdateJob} />
            <Route exact path="/jobList" component={JobListPage} />
            <Route path="/candidateProfile" component={ProfilePage} />
            <Route path="/addProfileDetails" component={AddProfileDetails} />
            <Route
              path="/addExperienceDetails"
              component={AddExperienceDetails}
            />
            <Route
              path="/updateProfileDetails/:id"
              component={UpdateProfileDetails}
            />
            <Route
              path="/updateExperienceDetails/:id"
              component={UpdateExperienceDetails}
            />
            <Route path="/addProjectDetails" component={AddProjectDetails} />
            <Route
              path="/updateProjectDetails/:id"
              component={UpdateProjectDetails}
            />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default Routers;
