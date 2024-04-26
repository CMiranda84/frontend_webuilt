import { createContext, useState, useEffect } from "react";
import db_URL from "../Interceptor/myApi";

// const db_URL = "http://localhost:5005/api";

export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = (token) => localStorage.setItem("token", token);
  const removeToken = () => localStorage.removeItem("token");

  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }
      const response = await db_URL.get(`/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      // console.log(error.message);
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };
  const logout = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        storeToken,
        removeToken,
        authenticateUser,
        isLoggedIn,
        isLoading,
        logout,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextWrapper;
