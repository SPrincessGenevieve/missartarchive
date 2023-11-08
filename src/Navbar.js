import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./styles.css";
import "./mobile.css";

function Navbar(props) {
  const [showNav, setShowNav] = useState(false);

  const handleToggleNav = () => {
    console.log("Toggle button clicked"); // Add this line
    setShowNav(!showNav);
  };

  return (
    <nav className={`nav ${showNav ? "show" : ""}`}>
      <div className="toggle-button" onClick={handleToggleNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-list ${showNav ? "show" : ""}`}>
        <CustomLink to="/records">RECORDS</CustomLink>
        <CustomLink to="/galleryPrivate">GALLERY</CustomLink>
        <CustomLink to="/aboutUsPrivate">ABOUT US</CustomLink>
        <CustomLink to="/">LOGOUT</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
