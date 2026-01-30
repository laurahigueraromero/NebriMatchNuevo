import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../App.css'; 

function DetallesComunidades() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className='app-layout'>
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className='navbar-logo'>NEBRIMATCH</div>
        
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="detalle-content">
        
        <h1>Detalles del Grupo #{id}</h1>
        
        <p>Aquí iría el chat, la lista de eventos y los miembros del grupo.</p>
        
        <div className="construction-card">
            <h3 className="construction-title">🚧 Página en construcción 🚧</h3>
            <p>Pronto conectaremos esto con la base de datos para ver la info real.</p>
        </div>

        <button 
            className="btn-black btn-margin-top" 
            onClick={() => navigate('/comunidades')}
        >
            Volver atrás
        </button>

      </div>
    </div>
  );
}

export default DetallesComunidades;