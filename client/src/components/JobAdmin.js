import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
// import Jobs from "./Jobs";
import JobsNoFunctions from "./JobsNoFunctions";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import PageBtnContainer from "./PageBtnContainer";

import JobAll from "./JobAll";
const JobAdmin = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    getJobsAll,
  } = useAppContext();
  useEffect(() => {
    getJobsAll();
  }, [page, search, searchStatus, searchType, sort]);
  const isAdmin = true;
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <JobAll key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobAdmin;
