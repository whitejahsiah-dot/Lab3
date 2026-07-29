import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Portfolio</Link>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin Dashboard</NavLink>
            <span className="navbar-user">Hi, {user?.name}</span>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className={({ isActive }) => isActive ? 'active' : ''}>Sign In</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
