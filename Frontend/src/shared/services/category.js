import { api } from "./api";

// get all categories
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

// create category
export const createCategory = async (data) => {
  const res = await api.post("/admin/categories", data);
  return res.data;
};

// update category
export const updateCategory = async (id, data) => {
  const res = await api.put(`/admin/categories/${id}`, data);
  return res.data;
};

// delete category
export const deleteCategory = async (id) => {
  const res = await api.delete(`/admin/categories/${id}`);
  return res.data;
};
