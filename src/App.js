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

function App() {
  const [loginUser, setLoginUser] = useState({
    username: 'null',
    email: 'null',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ['userList'],
    queryFn: getAllUsers,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  console.log({ data });

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
            />
          }
        >
          <Route
            path='/login'
            element={
              <Login
                setLoginUser={setLoginUser}
                setIsAuthenticated={setIsAuthenticated}
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
