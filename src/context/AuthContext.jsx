import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function register(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function login(email, password) {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      throw new Error("No user found. Please register first.");
    }

    if (savedUser.email !== email || savedUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    setUser(savedUser);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}