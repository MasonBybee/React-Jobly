import React from "react";
import { useUser } from "../features/User";
import "../static/Home.css";

const Home = () => {
  const { user } = useUser();
  return (
    <div className="Home">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place</p>
        {user.username ? (
          <h2>Welcome Back, {user.firstName}</h2>
        ) : (
          <p>
            <a className="btn btn-primary fw-bold me-3" href="/login">
              Log in
            </a>
            <a className="btn btn-primary fw-bold" href="/signup">
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
