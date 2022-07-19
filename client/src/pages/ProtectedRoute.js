import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { user, isEditing, clearValues, clearState } = useAppContext();
  const location = useLocation();
  // useEffect(() => {
  //   if (!isEditing) {
  //     // clearState();
  //     clearValues();
  //   }
  //   console.log("test");
  // }, [location]);

  if (!user) {
    return <Navigate to="/landing" />;
  }

  return children;
};

export default ProtectedRoute;
