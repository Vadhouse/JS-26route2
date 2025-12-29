import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/';

export const getTodosList = async () => {
  const todos = await axios.get('todos');
  return todos.data;
};

export const getTodoById = async (id) => {
  const res = await axios.get(`todos/${id}`);
  return res.data;
};

export const updateTodo = async (id, payload) => {
  const res = await axios.put(`todos/${id}`, payload);
  return res.data;
};

export const createTodo = async (payload) => {
  const res = await axios.post('todos', payload);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`todos/${id}`);
  return res.data;
};
