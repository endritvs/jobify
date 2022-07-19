import { useEffect } from "react";
import App from "../../assets/css/App.css";
import PageBtnContainer from "../../components/PageBtnContainer";
import { Loading } from "../../components";
import { useAppContext } from "../../context/appContext";
function AllApplications() {
  const {
    getAllApplications,
    isLoading,
    page,
    search,
    applicants,
    sort,
    numOfPages,
    totalJobApplications,
    deleteJobApplication,
  } = useAppContext();
  useEffect(() => {
    getAllApplications();
  }, [page, search, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (totalJobApplications === 0) {
    return (
      <div>
        <h2>No job application to display...</h2>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <h5>
        {totalJobApplications} job{applicants.length > 1 && "s"} applications
        found
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
          {applicants.map((applicants) => {
            return (
              <tr key={applicants._id}>
                <td className="letter">
                  {applicants.user[0].name + " " + applicants.user[0].lastName}
                </td>
                <td>{applicants.user[0].email}</td>

                <td>{applicants.job[0].position}</td>
                <td>{applicants.job[0].company}</td>
                <td>{applicants.job[0].jobLocation}</td>
                <td className="letter">{applicants.job[0].jobType}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteJobApplication(applicants._id)}
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

export default AllApplications;
