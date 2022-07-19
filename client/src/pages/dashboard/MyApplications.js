import { useEffect } from "react";
import App from "../../assets/css/App.css";
// import Loading from "./Loading";
import PageBtnContainer from "../../components/PageBtnContainer";
import { Loading } from "../../components";
import { useAppContext } from "../../context/appContext";
function MyApplications() {
  const {
    user,
    getAllMyApplications,
    isLoading,
    page,
    search,
    sort,
    jobApplications,
    numOfPages,
    totalJobApplications,
    deleteJobApplication,
  } = useAppContext();
  useEffect(() => {
    getAllMyApplications();
  }, [page, search, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobApplications.length === 0) {
    return (
      <div>
        <h2>No job application to display...</h2>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <h5>
        {totalJobApplications} job{jobApplications.length > 1 && "s"}{" "}
        applications found
      </h5>
      <table className="container">
        <thead>
          <tr>
            <th>User</th>
            <th>User Email</th>
            <th>Job Position</th>
            <th>Job Company</th>
            <th>Job Location</th>
            <th>Job Type</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((jobApplication) => {
            return (
              <tr key={jobApplication._id}>
                <td className="letter">{user.name + " " + user.lastName}</td>
                <td>{user.email}</td>

                <td>{jobApplication.job[0].position}</td>
                <td>{jobApplication.job[0].company}</td>
                <td>{jobApplication.job[0].jobLocation}</td>
                <td className="letter">{jobApplication.job[0].jobType}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteJobApplication(jobApplication._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
}

export default MyApplications;
