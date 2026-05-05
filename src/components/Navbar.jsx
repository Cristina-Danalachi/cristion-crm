import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Cristi<span className="brand-green">ON</span></Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>

      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user && <span>Hello, {user.firstName}</span>}
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;