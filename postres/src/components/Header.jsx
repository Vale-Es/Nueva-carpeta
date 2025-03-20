import React from "react";
import Navbar from "./Navbar";
import "./Header.css";
function Header() {
  return (
    <header className="header">
    <div className="header__tittle">
      <img src="placeholder" alt="Logo" />
      <h1 className="header__h1">Postres</h1>
    </div>
  
    <div className="div2 header__navbar">
      <Navbar />
    </div>
  
    <div className="header__buttons">
      {/* Aquí irán los botones para el usuario */}
      <button>Iniciar sesión</button>
      <button>Registro</button>
    </div>
  </header>
  );
}

export default Header;