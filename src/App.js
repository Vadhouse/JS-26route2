import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useQuery } from '@tanstack/react-query';
// import Home from './pages/home/home';
// import Todo from './pages/todo-list/Todo';
// import TodoEdit from './pages/todo-list/TodoEdit';
// import About from './pages/about/about';
// import Layout from './components/Layout/Layout';
// import NotFoundPage from './pages/not-found/not-found';
// import ErrorPage from './pages/error-page/error-page';
import { getAllUsers } from './api/api';
import { lazy, Suspense, useState } from 'react';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
// import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/home/home'));
const Todo = lazy(() => import('./pages/todo-list/Todo'));
const About = lazy(() => import('./pages/about/about'));
const Layout = lazy(() => import('./components/Layout/Layout'));
const NotFoundPage = lazy(() => import('./pages/not-found/not-found'));
const ErrorPage = lazy(() => import('./pages/error-page/error-page'));
const Login = lazy(() => import('./pages/login/login'));
const Registration = lazy(() => import('./pages/registration/registration'));

function App() {
  const [loginUser, setLoginUser] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('email');
    if (savedUsername && savedEmail) {
      return { username: savedUsername, email: savedEmail };
    }
    return { username: '', email: '' };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('username') && !!localStorage.getItem('email')
  );

  const { data: userList, isFetching } = useQuery({
    queryKey: ['userList'],
    queryFn: getAllUsers,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              isFetching={isFetching}
              isAuthenticated={isAuthenticated}
              loginUser={loginUser}
              setIsAuthenticated={setIsAuthenticated}
              setLoginUser={setLoginUser}
            />
          }
        >
          <Route
            path='/login'
            element={
              <Login
                userList={userList}
                setIsAuthenticated={setIsAuthenticated}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route
            path='/registration'
            element={
              <Registration
                setIsAuthenticated={setIsAuthenticated}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route index element={<Home />} />
          <Route
            path='/todo-list'
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <Todo />
              </PrivateRoutes>
            }
          />
          <Route
            path='/about'
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <About />
              </PrivateRoutes>
            }
          />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to='/404' />} />
          <Route path='/error-page' element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
