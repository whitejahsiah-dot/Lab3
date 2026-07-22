import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Portfolio</Link>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin Dashboard</NavLink>
      </div>
    </nav>
  );
}
