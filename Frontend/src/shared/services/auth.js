import { api } from "./api";

// login
export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  localStorage.setItem("token", res.data.token);

  return res.data;
};

// logout
export const logout = () => {
  localStorage.removeItem("token");
};

// get current user
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
