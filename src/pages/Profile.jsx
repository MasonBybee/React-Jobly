import React, { useState } from "react";
import { useUser } from "../features/User";
import JoblyApi from "../../helpers/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate("/");
  const { user, updateUser } = useUser();
  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const [values, setValues] = useState(initialState);
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await JoblyApi.updateUser(user.username, values);
    await updateUser();
    return navigate("/");
  }
  return (
    <div className="pt-5">
      <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Profile</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  disabled={true}
                  className="form-control"
                  placeholder=""
                  value={user.username}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  onChange={handleInput}
                  name="firstName"
                  className="form-control"
                  value={values.firstName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  onChange={handleInput}
                  name="lastName"
                  className="form-control"
                  value={values.lastName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  onChange={handleInput}
                  name="email"
                  className="form-control"
                  value={values.email}
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
