import { Alert } from "../../components";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ApplyJob = () => {
  const navigate = useNavigate();
  const {
    user,
    showAlert,
    displayAlert,
    isLoading,
    _id,
    position,
    company,
    jobLocation,
    jobType,
    applyJob,
  } = useAppContext();

  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [lastName] = useState(user?.lastName);
  const [location] = useState(user?.location);

  return (
    <Wrapper>
      <form className="form">
        <h3>
          {name} {lastName} you are applying for Job
        </h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            labelText={"job name"}
            type="text"
            name="position"
            value={position}
          />

          <FormRow
            labelText={"job position"}
            type="text"
            name="company"
            value={company}
          />
          <FormRow
            labelText="job location"
            type="text"
            name="jobLocation"
            value={jobLocation}
          />

          <FormRow
            type="text"
            labelText="job type"
            name="jobType"
            value={jobType}
          />
        </div>
      </form>
      <br></br>
      <form className="form">
        <h3>Personal Details</h3>
        <div className="form-center">
          <FormRow type="text" name="name" value={name} />
          <FormRow
            labelText="Last Name"
            type="text"
            name="lastName"
           value={lastName}
          />

          <FormRow type="email" name="email" value={email} />
          <FormRow
            type="text"
            labelText="location"
            name="location"
            value={location}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
              onClick={() => applyJob(_id)}
            >
              Apply for Job
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default ApplyJob;
