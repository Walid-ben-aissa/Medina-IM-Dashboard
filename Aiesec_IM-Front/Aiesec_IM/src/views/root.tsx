import { NavLink, Outlet } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }


  return (
    <>
      <header>
        <div className="navbar">
          <ul className="navbar-links">
              <NavLink to="/" className="navbar-link">
                Home
              </NavLink>
              {!localStorage.getItem('token') && (
              <NavLink to="/login" className="navbar-link">
                Login
              </NavLink>
              )}

              {!localStorage.getItem('token') && (
              <NavLink to="/register" className="navbar-link">
                Register
              </NavLink>
              )}

              {localStorage.getItem('token') && (
              <NavLink to="/dashboard" className="navbar-link">
                Dashboard
              </NavLink>
              )}

              {localStorage.getItem('token') && (
              <button onClick={logout} className="navbar-link">
                Logout
              </button>
            )}
          </ul>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <em>Made with Aiesec & IM</em>
      </footer>
    </>
  );
}

