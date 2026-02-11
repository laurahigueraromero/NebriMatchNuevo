import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComunidad, unirseComunidad } from '../services/api';
import '../App.css';

function DetallesComunidades() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    getComunidad(id)
      .then(data => {
        setComunidad(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUnirse = async () => {
    if (!usuario) {
      setMensaje("Debes iniciar sesión primero");
      return;
    }
    try {
      const res = await unirseComunidad(id, usuario.id);
      setMensaje(res.mensaje || res.error);
      // Recargar la comunidad para actualizar miembros
      const data = await getComunidad(id);
      setComunidad(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Comprobar si el usuario ya es miembro
  // "si comunidad existe, accede a miembros, y si miembros existe, ejecuta some() ==> esto lo metemos en la ternaria que si es miembro ya eres y si no puedes serlo
  // el some lo utilizamos porque si cumple con algo de la condicion nos devuelve true
  const yaMiembro = comunidad?.miembros?.some(m => m.id === usuario?.id);

  if (loading) return <p>Cargando...</p>;
  if (!comunidad || comunidad.mensaje) return <p>Comunidad no encontrada</p>;

  return (
    <div className='app-layout'>
      <nav className="navbar">
        <div className='navbar-logo'>NEBRIMATCH</div>
      </nav>

      <div className="detalle-content">
        <h1>{comunidad.nombre}</h1>
        <span className="tag-categoria">{comunidad.lenguaje_asociado}</span>
        <p>{comunidad.descripcion}</p>
        <p>Fecha de creación: {new Date(comunidad.fecha_creacion).toLocaleDateString('es-ES')}</p>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {yaMiembro ? (
          <p className="ya-miembro">✅ Ya eres miembro de esta comunidad</p>
        ) : (
          <button className="btn-red" onClick={handleUnirse}>
            Unirse a esta comunidad
          </button>
        )}

        <div className="miembros-section">
          <h3>Miembros ({comunidad.miembros ? comunidad.miembros.length : 0})</h3>
          {comunidad.miembros && comunidad.miembros.length > 0 ? (
            comunidad.miembros.map(m => (
              <div key={m.id} className="miembro-item">
                <span>👤 {m.nombre_usuario}</span>
                <span>Unido: {new Date(m.fecha_union).toLocaleDateString('es-ES')}</span>
              </div>
            ))
          ) : (
            <p>No hay miembros todavía</p>
          )}
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