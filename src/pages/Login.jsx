import React, { useState } from "react";
import "../static/auth.css";
import JoblyApi from "../../helpers/api";
import { useUser } from "../features/User";
import { useNavigate } from "react-router-dom";

const initialState = { username: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [values, setValues] = useState(initialState);

  function handleInput(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await JoblyApi.login(values);
    localStorage.setItem("username", values.username);
    localStorage.setItem("token", token);
    await updateUser();
    return navigate("/");
  }
  return (
    <div className="pt-5">
      <div className="Login-div">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="mb-3">Log In</h3>
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
                    required=""
                    value={values.username}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    onChange={handleInput}
                    type="password"
                    name="password"
                    className="form-control"
                    autoComplete="current-password"
                    required=""
                    value={values.password}
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

export default Login;
