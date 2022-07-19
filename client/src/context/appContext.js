import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducers";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CREATE_COMPANY_BEGIN,
  CREATE_COMPANY_ERROR,
  CREATE_COMPANY_SUCCESS,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_BEGIN,
  DELETE_COMPANY_BEGIN,
  EDIT_COMPANY_BEGIN,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_ERROR,
  SET_EDIT_COMPANY,
  APPLY_JOB_BEGIN,
  APPLY_JOB_ERROR,
  APPLY_JOB_SUCCESS,
  SET_JOB_ID,
  GET_APPLICATIONS_BEGIN,
  GET_APPLICATIONS_SUCCESS,
  DELETE_JOBAPPLICATION_BEGIN,
  GET_APPLICANTS_BEGIN,
  GET_APPLICANTS_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  DELETE_USER_BEGIN,
  SET_EDIT_USER,
  UPDATE_USER_ADMIN_BEGIN,
  UPDATE_USER_ADMIN_ERROR,
  UPDATE_USER_ADMIN_SUCCESS,
  CLEAR_STATE,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  //jobs ---------------------------------
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  companies: [],
  totalCompanies: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  //company ------------------------------------
  companyName: "",
  companyAddress: "",
  companyEmail: "",
  companyPhone: "",
  companyDescription: "",
  workingHourStart: "",
  workingHourEnd: "",
  companyLocation: userLocation || "",
  companyCategory: "",
  editCompanyId: "",
  //
  jobApplications: [],
  totalJobApplications: 0,

  applicants: [],
  users: [],
  // user edit admin
  editUserId: "",
  name: "",
  email: "",
  lastName: "",
  location: "",
  role: "",
  userVerify: false,
};

// eslint-disable-next-line no-undef
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1/",
  });
  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 4000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
 
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 400) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  //jobs //
  const clearState = () => {
    dispatch({ type: CLEAR_STATE });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getJobsAll = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs/find-job?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const deleteJobAdmin = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobsAll();
    } catch (error) {
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  // company

  const createCompany = async () => {
    dispatch({ type: CREATE_COMPANY_BEGIN });
    try {
      const {
        companyName,
        companyAddress,
        companyEmail,
        companyPhone,
        companyDescription,
        workingHourStart,
        workingHourEnd,
        companyLocation,
        companyCategory,
      } = state;
      await authFetch.post("/company", {
        companyName,
        companyAddress,
        companyEmail,
        companyPhone,
        companyDescription,
        workingHourStart,
        workingHourEnd,
        companyLocation,
        companyCategory,
      });
      dispatch({ type: CREATE_COMPANY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_COMPANY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllMyCompanies = async () => {
    const { search, sort, page } = state;
    let url = `/company?page=${page}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_COMPANY_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { companies, totalCompanies, numOfPages } = data;
      dispatch({
        type: GET_COMPANY_SUCCESS,
        payload: {
          companies,
          totalCompanies,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllCompanies = async () => {
    const { search, sort, page } = state;
    let url = `/company/find-company?page=${page}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_COMPANY_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { companies, totalCompanies, numOfPages } = data;
      dispatch({
        type: GET_COMPANY_SUCCESS,
        payload: {
          companies,
          totalCompanies,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const deleteCompany = async (companyId) => {
    dispatch({ type: DELETE_COMPANY_BEGIN });
    try {
      await authFetch.delete(`/company/${companyId}`);
      getAllMyCompanies();
    } catch (error) {
      logoutUser();
    }
  };

  const setEditCompany = (id) => {
    dispatch({ type: SET_EDIT_COMPANY, payload: { id } });
  };
  const editCompany = async () => {
    dispatch({ type: EDIT_COMPANY_BEGIN });
    try {
      const {
        companyName,
        companyAddress,
        companyEmail,
        companyPhone,
        companyDescription,
        workingHourStart,
        workingHourEnd,
        companyLocation,
        companyCategory,
      } = state;
      await authFetch.patch(`/company/${state.editCompanyId}`, {
        companyName,
        companyAddress,
        companyEmail,
        companyPhone,
        companyDescription,
        workingHourStart,
        workingHourEnd,
        companyLocation,
        companyCategory,
      });
      dispatch({ type: EDIT_COMPANY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_COMPANY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setJobId = (id) => {
    dispatch({ type: SET_JOB_ID, payload: { id } });
  };

  const applyJob = async (editJobId) => {
    dispatch({ type: APPLY_JOB_BEGIN });
    try {
      const { editJobId } = state;
      await authFetch.post("/jobApplication", {
        jobId: editJobId,
      });

      dispatch({ type: APPLY_JOB_SUCCESS });

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: APPLY_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllMyApplications = async () => {
    const { search, page, sort } = state;
    let url = `jobApplication/jobApplications?page=${page}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_APPLICATIONS_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { jobApplications, totalJobApplications, numOfPages } = data;
      dispatch({
        type: GET_APPLICATIONS_SUCCESS,
        payload: {
          jobApplications,
          totalJobApplications,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const whoAppliedMyJobs = async () => {
    const { page } = state;
    let url = `jobApplication/whoAppliedMyJobs?page=${page}`;

    dispatch({ type: GET_APPLICANTS_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { applicants, totalJobApplications, numOfPages } = data;
      dispatch({
        type: GET_APPLICANTS_SUCCESS,
        payload: {
          applicants,
          totalJobApplications,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const deleteJobApplication = async (jobApplicationId) => {
    dispatch({ type: DELETE_JOBAPPLICATION_BEGIN });
    try {
      await authFetch.delete(`/jobApplication/${jobApplicationId}`);
      getAllMyApplications();
    } catch (error) {
      logoutUser();
    }
  };

  const deleteWhoAppliedMyJobs = async (jobApplicationId) => {
    dispatch({ type: DELETE_JOBAPPLICATION_BEGIN });
    try {
      await authFetch.delete(`/jobApplication/${jobApplicationId}`);
      whoAppliedMyJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const getAllApplications = async () => {
    const { page } = state;
    let url = `jobApplication/getAllApplications?page=${page}`;

    dispatch({ type: GET_APPLICANTS_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { applicants, totalJobApplications, numOfPages } = data;
      dispatch({
        type: GET_APPLICANTS_SUCCESS,
        payload: {
          applicants,
          totalJobApplications,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllUsers = async () => {
    const { page } = state;

    let url = `auth/getAllUsers?page=${page}`;

    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch(url);

      const { users, totalUsers, numOfPages } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users,
          totalUsers,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const deleteUser = async (userId) => {
    dispatch({ type: DELETE_USER_BEGIN });
    try {
      await authFetch.delete(`/auth/${userId}`);
      getAllUsers();
    } catch (error) {
      logoutUser();
    }
  };

  const setEditUser = (id) => {
    dispatch({ type: SET_EDIT_USER, payload: { id } });
  };
  const editUser = async () => {
    dispatch({ type: UPDATE_USER_ADMIN_BEGIN });
    try {
      const { name, lastName, location, email, role } = state;
      await authFetch.patch(`/auth/${state.editUserId}`, {
        name,
        lastName,
        location,
        email,
        role,
      });
      dispatch({
        type: UPDATE_USER_ADMIN_SUCCESS,
        payload: {
          name,
          lastName,
          location,
          email,
          role,
        },
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_USER_ADMIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        getJobsAll,
        createCompany,
        getAllMyCompanies,
        getAllCompanies,
        deleteCompany,
        editCompany,
        setEditCompany,
        applyJob,
        setJobId,
        getAllMyApplications,
        deleteJobApplication,
        whoAppliedMyJobs,
        deleteWhoAppliedMyJobs,
        getAllApplications,
        getAllUsers,
        deleteUser,
        deleteJobAdmin,
        setEditUser,
        editUser,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
