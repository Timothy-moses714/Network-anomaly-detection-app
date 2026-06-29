import { useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const Users = () => {
  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      role: "Viewer",
    });

  const [users, setUsers] =
    useState([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
      },

      {
        id: 2,
        name: "Sarah Smith",
        email: "sarah@example.com",
        role: "Analyst",
      },

      {
        id: 3,
        name: "Michael James",
        email: "michael@example.com",
        role: "Viewer",
      },
    ]);

  const filteredUsers =
    useMemo(() => {
      return users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search, users]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id ===
          editingUser.id
            ? {
                ...user,
                ...formData,
              }
            : user
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "Viewer",
    });

    setEditingUser(null);
    setShowModal(false);
  };

  const editUser = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setShowModal(true);
  };

  const deleteUser = (id) => {
    setUsers((prev) =>
      prev.filter(
        (user) => user.id !== id
      )
    );
  };

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>
            User Management
          </h1>

          <p>
            Manage system users
            and permissions
          </p>
        </div>

        <button
          className="add-user-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          <FaPlus />
          Add User
        </button>

      </div>

      <div className="search-bar">

        <FaSearch />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="table-container">

        <table className="traffic-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map(
              (user) => (
                <tr key={user.id}>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    <span
                      className={`role-badge role-${user.role.toLowerCase()}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="view-btn"
                        onClick={() =>
                          editUser(user)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteUser(
                            user.id
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {showModal && (
        <div className="modal-overlay">

          <div className="user-modal">

            <div className="modal-header">

              <h2>
                {editingUser
                  ? "Edit User"
                  : "Create User"}
              </h2>

              <button
                onClick={
                  resetForm
                }
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="user-form"
            >

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Role
                </label>

                <select
                  name="role"
                  value={
                    formData.role
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option>
                    Admin
                  </option>

                  <option>
                    Analyst
                  </option>

                  <option>
                    Viewer
                  </option>

                </select>

              </div>

              <button
                className="save-btn"
                type="submit"
              >
                {editingUser
                  ? "Update User"
                  : "Create User"}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Users;