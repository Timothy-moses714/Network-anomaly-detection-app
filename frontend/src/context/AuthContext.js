import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    const storedToken =
      localStorage.getItem("token");

    if (
      storedUser &&
      storedToken
    ) {
      setUser(
        JSON.parse(storedUser)
      );

      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (
    userData
  ) => {
    try {
      const data =
        await authService.login(
          userData
        );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data);
      setToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    userData
  ) => {
    try {
      const data =
        await authService.register(
          userData
        );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data);
      setToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated:
      !!token,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);