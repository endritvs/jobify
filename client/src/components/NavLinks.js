import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { RiDashboardLine } from "react-icons/ri";
const NavLinks = ({ toggleSidebar }) => {
  const { clearFilters } = useAppContext();
  const handleSubmit = (e) => {
    clearFilters();
  };
  const { user } = useAppContext();

  return (
    <>
      <div className="nav-links">
        {user?.role === "admin" ? (
          <NavLink
            to="/dashboard"
            key="9"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">
              <RiDashboardLine />
            </span>
            Dashboard
          </NavLink>
        ) : (
          ""
        )}
        {links.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default NavLinks;
