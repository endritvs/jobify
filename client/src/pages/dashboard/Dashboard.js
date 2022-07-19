import React from "react";
import { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { MdQueryStats } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { SearchCompany } from "../../components";
import CompanyContainer from "../../components/Company";
import { SearchContainer } from "../../components";
import JobAdmin from "../../components/JobAdmin";
import AllApplications from "./AllApplications";
import AllUsers from "./AllUsers";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
function Dashboard() {
  const [page, setPage] = useState("profile");

  const { user } = useAppContext();
  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  // if (userVerify === false) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <div className="profile-buttons">
        <button
          className="btn btn-success btnn"
          onClick={() => setPage("all-jobs")}
        >
          <MdQueryStats /> All Jobs
        </button>
        <button
          className="btn btn-success btnn"
          onClick={() => setPage("my-companies")}
        >
          <BsBuilding /> All Companies
        </button>

        <button
          className="btn btn-success btnn"
          onClick={() => setPage("all-applications")}
        >
          <RiFileEditLine /> All Applications
        </button>

        <button
          className="btn btn-success btnn"
          onClick={() => setPage("all-users")}
        >
          <FiUsers /> All Users
        </button>
      </div>
      {page === "all-jobs" && (
        <>
          <SearchContainer /> <JobAdmin />
        </>
      )}
      {page === "my-companies" && (
        <>
          <SearchCompany /> <CompanyContainer />
        </>
      )}
      {page === "all-applications" && (
        <>
          <AllApplications />
        </>
      )}
      {page === "all-users" && (
        <>
          <AllUsers />
        </>
      )}
    </div>
  );
}

export default Dashboard;
