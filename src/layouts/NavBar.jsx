import { Link, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../features/User";
import { useState, useEffect } from "react";

const NavBar = () => {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  const { user, logout } = useUser();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <>
      <nav className="Navigation navbar navbar-expand-md">
        <div className="container-fluid">
          <Link
            className={"navbar-brand" + (url === "/" ? " active" : "")}
            to="/"
          >
            Jobly
          </Link>
          <ul className="navbar-nav ms-auto">
            {user.username ? (
              <>
                <li className="nav-item me-4">
                  <Link
                    className={
                      "nav-link" + (url === "/companies" ? " active" : "")
                    }
                    to="/companies"
                  >
                    Companies
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link
                    className={"nav-link" + (url === "/jobs" ? " active" : "")}
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link
                    className={
                      "nav-link" + (url === "/profile" ? " active" : "")
                    }
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link onClick={logout} className="nav-link" to="/">
                    Log Out {user.username}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-4">
                  <Link
                    className={"nav-link" + (url === "/login" ? " active" : "")}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link
                    className={
                      "nav-link" + (url === "/signup" ? " active" : "")
                    }
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
