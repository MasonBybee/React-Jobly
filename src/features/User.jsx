import React, { createContext, useContext, useState } from "react";
import JoblyApi from "../../helpers/api";
import { redirect } from "react-router-dom";

const UserContext = createContext(null);

const initialState = { username: "", token: "" };

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialState);
  const logout = () => {
    localStorage.setItem("username", initialState.username);
    localStorage.setItem("token", initialState.token);
    setUser(initialState);
    return redirect("/");
  };

  async function updateUser() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (username && token) {
      const resp = await JoblyApi.getUser(username);
      setUser({ ...resp, token: token });
    }
  }

  return (
    <UserContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
