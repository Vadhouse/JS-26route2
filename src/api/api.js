import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/';

// Перенаправлення на сторінку помилок на сервері (5xx) або помилки мережі
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (!error.response || (status >= 500 && status < 600)) {
      window.location.href = '/error-page';
    }
    return Promise.reject(error);
  }
);

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

export const addUser = async (payload) => {
  const res = await axios.post('auth', payload);
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get('auth');
  return res.data;
};
