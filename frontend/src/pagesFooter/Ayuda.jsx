import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Ayuda() {
  const navigate = useNavigate();
  return (
    <div className="legal-page">
      <h1>Ayuda</h1>
      <p>Bienvenido a Nebrimatch. Al usar nuestra plataforma aceptas...</p>
      <button className="btn-black" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
}
export default Ayuda;