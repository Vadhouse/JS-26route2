import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === 'navigate' && e.data?.to) {
        navigate(e.data.to);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [navigate]);

  return (
    <>
      <header className='site-header'>
        <nav className='nav'>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/todo-list'
            state={{ from: 'homePage' }}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Туду Ліст
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Про застосунок
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className='site-footer'>All rights 2025</footer>
    </>
  );
};

export default Layout;
