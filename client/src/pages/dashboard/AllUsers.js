import { useEffect } from "react";
import App from "../../assets/css/App.css";
import PageBtnContainer from "../../components/PageBtnContainer";
import { Loading } from "../../components";
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
function AllUsers() {
  const {
    isLoading,
    page,
    search,
    sort,
    numOfPages,
    users,
    totalUsers,
    getAllUsers,
    deleteUser,
    setEditUser,
  } = useAppContext();
  useEffect(() => {
    getAllUsers();
  }, [page, search, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (users.length === 0) {
    return (
      <div>
        <h2>No users to display...</h2>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <h5>
        {totalUsers} user{users.length > 1 && "s"} found
      </h5>
      <table className="container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td className="letter">{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>

                <td>{user.location}</td>

                <td>{user.role}</td>
                <td>
                  {/* edit-user */}

                  <Link
                    to="/edit-user"
                    className="btn edit-btn"
                    onClick={() => setEditUser(user._id)}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
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

export default AllUsers;
