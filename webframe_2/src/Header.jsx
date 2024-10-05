import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <h1>Ecotoxicity</h1>
        <div className="button-group">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/model" className="nav-link">
            Model
          </Link>
          <Link to="/contact" className="nav-link">
            Contact Us
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
