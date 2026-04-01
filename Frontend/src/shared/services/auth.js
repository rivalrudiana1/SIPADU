import { api } from "./api";

// login
export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

// register (Tambahan Baru)
export const register = async (data) => {
  // data berisi object seperti { name, email, password }
  const res = await api.post("/auth/register", data);
  return res.data;
};

// logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// get current user
export const getMe = async () => {
  const res = await api.get("/auth/me"); 
  return res.data;
};