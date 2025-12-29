import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Todo from './pages/todo-list/Todo';
import TodoEdit from './pages/todo-list/TodoEdit';
import About from './pages/about/about';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/todo-list' element={<Todo />} />
            <Route path='/todo-list/:id' element={<TodoEdit />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
