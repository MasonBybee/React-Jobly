import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import NavBar from "./layouts/NavBar";
import Companies from "./pages/Companies";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import CompanyDetail from "./pages/CompanyDetail";
import Profile from "./pages/Profile";
import { useUser } from "./features/User";
import ProtectedRoute from "./componenets/ProtectedRoute";

function App() {
  const { user, updateUser } = useUser();
  if (!user.username) {
    updateUser();
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route
            path="/companies"
            element={<ProtectedRoute children={<Companies />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/jobs"
            element={<ProtectedRoute children={<Jobs />} />}
          />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route
            path="profile"
            element={<ProtectedRoute children={<Profile />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
