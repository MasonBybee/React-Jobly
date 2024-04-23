import React, { useState } from "react";
import "../static/auth.css";
import JoblyApi from "../../helpers/api";
import { useUser } from "../features/User";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [values, setValues] = useState(initialState);

  function handleInput(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await JoblyApi.register(values);
    localStorage.setItem("username", values.username);
    localStorage.setItem("token", token);
    await updateUser();
    return navigate("/");
  }
  return (
    <div className="pt-5">
      <div className="Signup">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Sign Up</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    onChange={handleInput}
                    name="username"
                    className="form-control"
                    autoComplete="username"
                    value={values.username}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    onChange={handleInput}
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="form-control"
                    value={values.password}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">First name</label>
                  <input
                    onChange={handleInput}
                    name="firstName"
                    className="form-control"
                    value={values.firstName}
                    autoComplete="firstName"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last name</label>
                  <input
                    onChange={handleInput}
                    name="lastName"
                    className="form-control"
                    value={values.lastName}
                    autoComplete="lastName"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    onChange={handleInput}
                    type="email"
                    name="email"
                    className="form-control"
                    autoComplete="email"
                    value={values.email}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
