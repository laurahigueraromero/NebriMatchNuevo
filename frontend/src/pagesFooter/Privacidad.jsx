import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Privacidad() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      
      <nav className="navbar">
        <div className='navbar-logo'>NEBRIMATCH</div>
        <div className='navbar-menu'>
          <span onClick={() => navigate('/comunidades')} className="nav-link">Volver al tablón</span>
        </div>
      </nav>

      <div className="legal-page">
        <h1>Política de Privacidad</h1>
        <p className="legal-date">Última actualización: Febrero 2026</p>

        <div className="legal-content">
          <h3>1. Responsable del Tratamiento</h3>
          <p>
            Nebrimatch es una plataforma académica creada por estudiantes de la Universidad Nebrija. 
            Esta aplicación tiene fines exclusivamente educativos y de conexión entre alumnos.
          </p>

          <h3>2. Datos que Recopilamos</h3>
          <p>Para el funcionamiento del servicio, necesitamos tratar los siguientes datos:</p>
          <ul>
            <li><strong>Datos de Identificación:</strong> Nombre y apellidos.</li>
            <li><strong>Datos de Contacto:</strong> Correo electrónico universitario.</li>
            <li><strong>Perfil Académico:</strong> Rol (Alumno/Mentor) e intereses.</li>
          </ul>

          <h3>3. Finalidad de los Datos</h3>
          <p>
            Tus datos solo se usarán para permitirte el acceso a las comunidades, gestionar los chats 
            y facilitar el contacto con otros estudiantes con intereses similares. No compartiremos tus datos con terceros.
          </p>

          <h3>4. Tus Derechos</h3>
          <p>
            En cualquier momento puedes ejercer tus derechos de acceso, rectificación y eliminación de tu cuenta 
            escribiendo a nuestro equipo de soporte o desde tu perfil de usuario.
          </p>
        </div>

        <button className="btn-black btn-margin-top" onClick={() => navigate(-1)}>
          Entendido, volver atrás
        </button>
      </div>
    </div>
  );
}

export default Privacidad;