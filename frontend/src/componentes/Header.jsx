import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      
      <div
        className="navbar-logo"
        onClick={() => navigate("/comunidades")}
        style={{ cursor: "pointer" }}
      >
        NEBRIMATCH
      </div>

      <div className="navbar-menu">
        <span className="nav-link" onClick={() => navigate("/parati")}>
          Para Ti
        </span>
        <span className="nav-link" onClick={() => navigate("/comunidades")}>
          Comunidades
        </span>
        <span className="nav-link" onClick={() => navigate("/chats")}>
          Mis chats
        </span>
        <span className="nav-link" onClick={() => navigate("/miperfil")}>
          Perfil
        </span>
      </div>
    </nav>
  );
}

export default Header;
