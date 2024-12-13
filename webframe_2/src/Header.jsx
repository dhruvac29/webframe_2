import { Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Ecotoxicity</h1>
      <nav className="button-group">
        <Link to="/" className={isActive('/')}>
          Home
        </Link>
        <Link to="/model" className={isActive('/model')}>
          Model
        </Link>
        <Link to="/contact" className={isActive('/contact')}>
          Contact Us
        </Link>
      </nav>
    </header>
  );
};

export default Header;
