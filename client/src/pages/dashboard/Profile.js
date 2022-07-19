import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { MdQueryStats } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";
import Profilee from "../../assets/css/Profilee.css";
import AllJobs from "./AllJobs";
import MyApplications from "./MyApplications";
import WhoAppliedMyJobs from "./WhoAppliedMyJobs";
import { CompanyContainer, SearchCompany } from "../../components";
import { ImProfile } from "react-icons/im";
import { FiUsers } from "react-icons/fi";

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    // updateUserPassword,
    isLoading,
  } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  // const [password, setPassword] = useState(user?.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    //remove while testing
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  const [page, setPage] = useState("profile");

  return (
    <div>
      <div className="profile-buttons">
        <button
          className="btn btn-success btnn"
          onClick={() => setPage("profile")}
        >
          <ImProfile /> Profile
        </button>
        <button
          className="btn btn-success btnn"
          onClick={() => setPage("all-jobs")}
        >
          <MdQueryStats /> My Jobs
        </button>
        <button
          className="btn btn-success btnn"
          onClick={() => setPage("my-companies")}
        >
          <BsBuilding /> My Companies
        </button>

        <button
          className="btn btn-success btnn"
          onClick={() => setPage("my-applications")}
        >
          <RiFileEditLine /> My Applications
        </button>

        <button
          className="btn btn-success btnn"
          onClick={() => setPage("who-applied-my-jobs")}
        >
          <FiUsers /> Who applied my jobs
        </button>
      </div>
      {page === "profile" && (
        <Wrapper>
          <form className="form" onSubmit={handleSubmit}>
            <h3>Profile</h3>
            {showAlert && <Alert />}
            <div className="form-center">
              <FormRow
                type="text"
                name="name"
                value={name}
                handleChange={(e) => setName(e.target.value)}
              />
              <FormRow
                labelText="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                handleChange={(e) => setLastName(e.target.value)}
              />

              <FormRow
                type="email"
                name="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
              <FormRow
                type="text"
                labelText="location"
                name="location"
                value={location}
                handleChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Please Wait..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Wrapper>
      )}
      {page === "all-jobs" && <AllJobs />}
      {page === "my-companies" && (
        <>
          <SearchCompany /> <CompanyContainer />
        </>
      )}
      {page === "my-applications" && (
        <>
          <MyApplications />
        </>
      )}
      {page === "who-applied-my-jobs" && (
        <>
          <WhoAppliedMyJobs />
        </>
      )}
    </div>
  );
};

export default Profile;
