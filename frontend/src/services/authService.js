import API from "./api";

const register = async (
  userData
) => {
  const response =
    await API.post(
      "/auth/register",
      userData
    );

  return response.data;
};

const login = async (
  userData
) => {
  const response =
    await API.post(
      "/auth/login",
      userData
    );

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;