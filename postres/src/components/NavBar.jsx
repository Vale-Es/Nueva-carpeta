import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
    <ul>
      <li>
        <Link className="nav-link" to="/">Inicio</Link>
      </li>
      <li>
        <Link className="nav-link" to="/Inventario">Inventario</Link>
      </li>
      <li>
        <Link className="nav-link" to="/Ganancias">Ganancias</Link>
      </li>
    </ul>
  </nav>
  );
}

export default NavBar;