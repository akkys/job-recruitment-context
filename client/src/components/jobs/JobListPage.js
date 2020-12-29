import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import JobsList from "./JobsList";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import PaginationBar from "../layout/PaginationBar";
import PaginationButton from "../layout/PaginationButtons";
import SearchInput from "../candidate/layout/SearchInput";
import DropDownMenu from "../candidate/layout/DropDownMenu";
import LocationsTags from "../candidate/layout/LocationsTags";
import JobtypeTags from "../candidate/layout/JobtypeTags";
import ExperiencesTags from "../candidate/layout/ExperiencesTags";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  const { userData } = useContext(UserContext);

  const locations = [
    { name: "All", value: "All" },
    { name: "Bangalore", value: "Bangalore" },
    { name: "Pune", value: "Pune" },
    { name: "Delhi", value: "Delhi" },
    { name: "Hyderabad", value: "Hyderabad" },
  ];

  const jobTypes = [
    { name: "Full-Time", value: "Full-time" },
    { name: "Part-Time", value: "Part-time" },
    { name: "Full-Time, Remote", value: "Full-time, Remote" },
    { name: "Part-Time, Remote", value: "Part-time, Remote" },
    { name: "Only Remote", value: "Only Remote" },
  ];

  const experiences = [
    { name: "1 year", value: "1" },
    { name: "2 years", value: "2" },
    { name: "3 years", value: "3" },
    { name: "4 years", value: "4" },
    { name: "5 years", value: "5" },
    { name: "5+ years", value: "5+" },
  ];

  useEffect(() => {
    document.title = "Jobs List: Job-Recruitment";
    if (userData.user) {
      if (userData.user.category === "Candidate") {
        async function getJobData() {
          const jobData = await axios.get("http://localhost:5000/jobList/all");
          // console.log("JobData", jobData);
          setJobs(jobData.data);
          setIsLoading(false);
        }
        getJobData();
      } else {
        async function getJobData() {
          const jobData = await axios.get("http://localhost:5000/jobList/", {
            headers: { "x-auth-token": userData.token },
          });
          // console.log("JobData", jobData);
          setJobs(jobData.data);
          setIsLoading(false);
        }
        getJobData();
      }
    }
  }, [userData]);
  console.log("Data", jobs);

  const deleteJob = async (id) => {
    await axios.delete("http://localhost:5000/jobList/" + id, {
      headers: { "x-auth-token": userData.token },
    });
    setJobs(jobs.filter((job) => job._id !== id));

    // history.push("/getJobs");
  };

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => {
        return (
          job.languages.includes(search) ||
          job.companyName.toLowerCase().includes(search.toLowerCase()) ||
          job.contract.toLowerCase().includes(search.toLowerCase()) ||
          job.position.toLowerCase().includes(search.toLowerCase()) ||
          job.role.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, jobs]);
  console.log("Filter", filteredJobs);

  const handleFilter = (e) => {
    const byFilter = e.target.value;
    let filterJob = [];
    let computedJobs = jobs;
    if (e.target.value === "All") {
      filterJob = computedJobs;
    } else {
      filterJob = computedJobs.filter(
        (job) =>
          job.contract.toLowerCase() === byFilter.toLowerCase() ||
          job.location === byFilter ||
          job.experience === byFilter
      );
    }
    setFilteredJobs(filterJob);
    console.log("FilterJobs", filterJob);
  };

  const sortByHighToLow = () => {
    const sorted = [...filteredJobs].sort((a, b) => {
      return b.minSalary - a.minSalary;
    });
    setFilteredJobs(sorted);

    console.log(sorted);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < filteredJobs.length / jobsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="home-container container">
      <div className="row mb-5">
        {jobs.length === 0 ? (
          <div className="col-md-10">
            <h1>No Jobs Added!</h1>
          </div>
        ) : (
          <div className="col-md-10">
            <h1>Job Lists</h1>
          </div>
        )}

        {userData.user ? (
          <>
            {userData.user.category === "Employer" && (
              <div className="col-md-2">
                <Link to="/addJob" className="btn btn-primary btn-lg btn-block">
                  Add Job
                </Link>
              </div>
            )}
          </>
        ) : (
          <span></span>
        )}
      </div>
      <div>
        {userData.user ? (
          <>
            {userData.user.category === "Candidate" && (
              <div className="row mb-4">
                <div className="col-md-3">
                  <DropDownMenu sortByHighToLow={sortByHighToLow} />
                </div>
                <div className="col-md-6 input-group">
                  <SearchInput search={search} setSearch={setSearch} />
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      {userData.user ? (
        <>
          {userData.user.category === "Candidate" && (
            <>
              <div className="row">
                <div className="col-md-6">
                  <LocationsTags
                    locations={locations}
                    handleFilter={handleFilter}
                  />
                </div>
                <div className="col-md-6">
                  <JobtypeTags
                    jobTypes={jobTypes}
                    handleFilter={handleFilter}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <ExperiencesTags
                    experiences={experiences}
                    handleFilter={handleFilter}
                  />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <span></span>
      )}

      <PaginationBar
        jobsPerPage={jobsPerPage}
        totalJobs={filteredJobs.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <h5 className="ml-3 mb-4 mt-3" style={{ fontWeight: "530" }}>
        {filteredJobs.length} results found.
      </h5>
      {currentJobs.map((job) => {
        return (
          <JobsList
            job={job}
            key={job._id}
            deleteJob={deleteJob}
            userData={userData}
          />
        );
      })}

      <PaginationButton
        jobsPerPage={jobsPerPage}
        totalJobs={filteredJobs.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default JobListPage;
