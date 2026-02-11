import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Terminos() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      {/* Reutilizamos Navbar simple */}
      <nav className="navbar">
        <div className='navbar-logo'>NEBRIMATCH</div>
        <div className='navbar-menu'>
          <span onClick={() => navigate('/comunidades')} className="nav-link">Volver al tablón</span>
        </div>
      </nav>

      <div className="legal-page">
        <h1>Términos y Condiciones de Uso</h1>
        

        <div className="legal-content">
          <h3>1. Introducción</h3>
          <p>Bienvenido a Nebrimatch. Al acceder a nuestra plataforma, aceptas cumplir con las normas de la comunidad universitaria.</p>

          <h3>2. Uso Aceptable</h3>
          <p>Los usuarios se comprometen a:</p>
          <ul>
            <li>No publicar contenido ofensivo o discriminatorio.</li>
            <li>Usar su identidad real vinculada al correo universitario.</li>
            <li>No utilizar la plataforma para spam o fines comerciales.</li>
          </ul>

          <h3>3. Propiedad Intelectual</h3>
          <p>Todo el contenido generado por Nebrimatch es propiedad de la plataforma. El contenido de los grupos pertenece a sus autores.</p>
        </div>

        <button className="btn-black btn-margin-top" onClick={() => navigate(-1)}>
          Aceptar y Volver
        </button>
      </div>
    </div>
  );
}

export default Terminos;