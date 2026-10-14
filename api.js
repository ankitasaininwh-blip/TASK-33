import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export async function getTasks(search = "") {
  const response = await api.get("/tasks", {
    params: search ? { search } : {}
  });

  return response.data;
}

export async function addTask(task) {
  const response = await api.post("/tasks", task);
  return response.data;
}

export async function editTask(id, task) {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
}

export async function changeTaskStatus(id, completed) {
  const response = await api.patch(`/tasks/${id}/status`, {
    completed
  });

  return response.data;
}

export async function removeTask(id) {
  await api.delete(`/tasks/${id}`);
}