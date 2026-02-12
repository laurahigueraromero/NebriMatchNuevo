import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* El logo ahora es clicable y te lleva al inicio de la app */}
      <div 
        className='navbar-logo' 
        onClick={() => navigate('/comunidades')} 
        style={{cursor: 'pointer'}}
      >
        NEBRIMATCH
      </div>
      
      <div className='navbar-menu'>
        <span className="nav-link" onClick={() => navigate('/comunidades')}>
          Comunidades
        </span>
        <span className="nav-link" onClick={() => alert("Próximamente: Tus chats")}>
          Mis chats
        </span>
        <span className="nav-link" onClick={() => alert("Próximamente: Tu perfil")}>
          Perfil
        </span>
      </div>
    </nav>
  );
}

export default Header;