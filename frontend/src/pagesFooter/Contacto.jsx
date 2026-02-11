import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Contacto() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente. Te responderemos pronto.");
    navigate('/');
  };

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className='navbar-logo'>NEBRIMATCH</div>
      </nav>

      <div className="legal-page">
        <h1>Contacta con nosotros</h1>
        <p>¿Tienes alguna duda o sugerencia? Escríbenos.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Tu Nombre" required className="input-field" />
            <input type="email" placeholder="Tu Email Universitario" required className="input-field" />
            <textarea placeholder="¿En qué podemos ayudarte?" rows="5" className="input-field" required></textarea>
            
            <button type="submit" className="btn-red">ENVIAR MENSAJE</button>
        </form>

        <button className="btn-black btn-margin-top" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Contacto;