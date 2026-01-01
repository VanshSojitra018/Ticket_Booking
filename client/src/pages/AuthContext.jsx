import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // load user from localStorage initially
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // REGISTER
  const register = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // LOGIN
  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) return false;

    if (saved.email === email && saved.password === password) {
      setUser(saved);
      return true;
    }
    return false;
  };

  // UPDATE PROFILE
  const updateUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // LOGOUT (FIXED)
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
