import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const {
    showAlert,
    displayAlert,
    isEditing,
    editUser,
    isLoading,
    name,
    email,
    lastName,
    location,
    role,
    handleChange,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location || !role) {
      displayAlert();
      return;
    }
    editUser({ name, email, lastName, location, role });
    return;
  };

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <div>
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          {showAlert && <Alert />}
          <div className="form-center">
            <FormRow
              type="text"
              name="name"
              value={name}
              handleChange={handleUserInput}
            />
            <FormRow
              labelText="Last Name"
              type="text"
              name="lastName"
              value={lastName}
              handleChange={handleUserInput}
            />

            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={handleUserInput}
            />
            <FormRow
              type="text"
              labelText="location"
              name="location"
              value={location}
              handleChange={handleUserInput}
            />
            <FormRow
              type="text"
              labelText="Role"
              name="role"
              value={role}
              handleChange={handleUserInput}
            />
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Please Wait..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

export default Profile;
