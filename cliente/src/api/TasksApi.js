import axios from 'axios';

const tasksapi = axios.create({
  baseURL: 'http://localhost:8000/tasks/api/v1/',
});

export const getAllTasks = (user_id) => {
  return tasksapi.get(`tasks/?user_id=${user_id}`).then((res) => res.data);
};

export const createTask = (task) => {
  return tasksapi.post('tasks/', task);
};

export const deleteTask = (id) => {
  return tasksapi.delete(`tasks/${id}/`);
};

export const updateTask = (id, task) => {
  return tasksapi.patch(`tasks/${id}/`, task);
};




export const getTask = (id) => tasksapi.get(`tasks/${id}/`).then(res => res.data);

export const getUser = () => tasksapi.get("login/").then(res => res.data);

export const createUser = (user) => tasksapi.post("login/", user).then(res => res.data);
