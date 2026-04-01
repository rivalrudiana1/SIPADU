import { api } from "./api";

// login
export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

// logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// get current user
export const getMe = async () => {
  const res = await api.get("/auth/me"); // atau /auth/me kalau kamu buat di backend
  return res.data;
};