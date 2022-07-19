import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert } from "../../components";

const AddCompany = () => {
  const {
    isLoading,
    handleChange,
    isEditing,
    showAlert,
    displayAlert,
    //company
    companyName,
    companyAddress,
    companyEmail,
    companyPhone,
    companyDescription,
    workingHourStart,
    workingHourEnd,
    companyLocation,
    companyCategory,
    createCompany,
    editCompany,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !companyName ||
      !companyAddress ||
      !companyEmail ||
      !companyPhone ||
      !companyDescription ||
      !companyLocation ||
      !workingHourStart ||
      !workingHourEnd ||
      !companyCategory
    ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editCompany();
      return;
    }
    createCompany();
  };
  const handleCompanyInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit company" : "add company"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            labelText={"Company Name"}
            type="text"
            name="companyName"
            value={companyName}
            handleChange={handleCompanyInput}
          />
          {/* company */}
          <FormRow
            labelText={"Company Address"}
            type="text"
            name="companyAddress"
            value={companyAddress}
            handleChange={handleCompanyInput}
          />
          {/* location */}
          <FormRow
            labelText={"Company Email"}
            type="email"
            name="companyEmail"
            value={companyEmail}
            handleChange={handleCompanyInput}
          />
          <FormRow
            type="number"
            name="companyPhone"
            labelText={"Company Phone"}
            value={companyPhone}
            handleChange={handleCompanyInput}
          />
          <FormRow
            // labelText="job type"
            labelText={"Company Description"}
            name="companyDescription"
            value={companyDescription}
            handleChange={handleCompanyInput}
          />
          <FormRow
            type="time"
            labelText="Working Hours Start"
            name="workingHourStart"
            value={workingHourStart}
            handleChange={handleCompanyInput}
          />
          <FormRow
            labelText="Working Hours End"
            name="workingHourEnd"
            value={workingHourEnd}
            handleChange={handleCompanyInput}
            type="time"
          />
          <FormRow
            type="text"
            name="companyLocation"
            labelText="Company Location"
            value={companyLocation}
            handleChange={handleCompanyInput}
          />

          <FormRow
            type="text"
            name="companyCategory"
            labelText="Company Category"
            value={companyCategory}
            handleChange={handleCompanyInput}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddCompany;
