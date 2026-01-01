import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) return false;

    if (saved.email === email && saved.password === password) {
      setUser(saved);
      return true;
    }
    return false;
  };

  const updateUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
