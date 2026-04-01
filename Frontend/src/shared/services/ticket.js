import { api } from "./api";

// ================= USER =================

// create ticket
export const createTicket = async (data) => {
  const res = await api.post("/tickets", data);
  return res.data;
};

// get ticket by id (tracking)
export const getTicketById = async (id) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data;
};

// get user tickets (optional)
export const getUserTickets = async (kontak) => {
  const res = await api.get(`/tickets?kontak=${kontak}`);
  return res.data;
};

// ================= ADMIN =================

// get all tickets
export const getAllTickets = async (params = {}) => {
  const res = await api.get("/admin/tickets", { params });
  return res.data;
};

// get detail
export const getTicketDetail = async (id) => {
  const res = await api.get(`/admin/tickets/${id}`);
  return res.data;
};

// update status
export const updateTicketStatus = async (id, status) => {
  const res = await api.put(`/admin/tickets/${id}/status`, {
    status,
  });
  return res.data;
};

// assign department
export const assignTicket = async (id, assignedTo) => {
  const res = await api.put(`/admin/tickets/${id}/assign`, {
    assignedTo,
  });
  return res.data;
};

// delete ticket
export const deleteTicket = async (id) => {
  const res = await api.delete(`/admin/tickets/${id}`);
  return res.data;
};
