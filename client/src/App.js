import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute } from "./pages";
import {
  AllJobs,
  AddJob,
  Profile,
  SharedLayout,
  Stats,
  AddCompany,
  ApplyJob,
  FindCompany,
  AllCompanies,
  MyApplications,
} from "./pages/dashboard";
import FindJob from "./pages/dashboard/FindJob";
import Dashboard from "./pages/dashboard/Dashboard";
import EditUser from "./pages/dashboard/EditUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
          <Route path="company" element={<AddCompany />} />

          <Route path="edit-user" element={<EditUser />} />

          <Route path="my-companies" element={<AllCompanies />} />

          <Route path="find-job" element={<FindJob />} />
          <Route path="find-company" element={<FindCompany />} />
          <Route path="apply-job/:id" element={<ApplyJob />} />
          <Route path="my-applications" element={<MyApplications />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
