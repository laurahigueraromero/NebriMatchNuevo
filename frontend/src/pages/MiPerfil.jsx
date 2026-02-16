import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPerfil } from "../services/api";
import EditarPerfilModal from "../componentes/EditarPerfilModal/EditarPerfilModal";
import InteresPerfil from '../componentes/InteresPerfil/InteresPerfil';
import persona1 from "../assets/imagenes/Captura.JPG";
import TarjetaHome from '../componentes/TarjetaHome';
import Header from "../componentes/Header";

function MiPerfil() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [perfilData, setPerfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (location.pathname.includes("editarPerfil")) {
      setModalAbierto(true);
    }
  }, [location]);

  // Cargar datos del perfil
  useEffect(() => {
    if (usuario?.id) {
      getPerfil(usuario.id)
        .then((data) => {
          setPerfilData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error al cargar perfil:', err);
          // Si falla la API, usar datos del localStorage
          setPerfilData(usuario);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [usuario?.id]);

  // Función para actualizar el perfil cuando se edita
  const actualizarPerfil = (datosNuevos) => {
    setPerfilData(prev => ({ ...prev, ...datosNuevos }));
  };

  if (loading) return <div className="loading">⏳ Cargando perfil...</div>;
  if (!perfilData && !usuario) return <div className="error">❌ No se pudo cargar el perfil</div>;

  const datosActuales = perfilData || usuario;

  // Convertir strings de lenguajes a arrays para mostrar como tarjetas
  const lenguajesEnsenar = datosActuales.lenguajes_a_ensenar 
    ? datosActuales.lenguajes_a_ensenar.split(',').map(l => l.trim()) 
    : [];
  const lenguajesAprender = datosActuales.lenguajes_a_aprender 
    ? datosActuales.lenguajes_a_aprender.split(',').map(l => l.trim()) 
    : [];

  return (
    <div className="app-layout">
      <Header />
      
      <div className='body-perfil'>
        <div className='contenido-perfil'>
          <div className="fila1-perfil">
            <div className='img2-perfil'>
              <img src={persona1} alt={`Foto de perfil de ${datosActuales.nombre_usuario}`} />
            </div>

            <div className='col2-perfil'>
              <div className='editar-perfil'>
                <button onClick={() => {
                  setModalAbierto(true);
                  navigate("/miPerfil/editarPerfil");
                }}>
                  ✏️ Editar perfil
                </button>
              </div>
            </div>
          </div>

          <div className='fila2-perfil'>
            <h2>{datosActuales.nombre_usuario}</h2>
            <p className="email-perfil">📧 {datosActuales.email}</p>
          </div>

          <div className='fila3-perfil'>
            <p>{datosActuales.descripcion || 'Sin descripción disponible'}</p>
          </div>

          {lenguajesAprender.length > 0 && (
            <>
              <div className='fila4-perfil'>
                <h2>🎯 Quiero aprender:</h2>
              </div>
              <div className='fila4-perfil'>
                {lenguajesAprender.map((lenguaje, index) => (
                  <TarjetaHome key={index} title={lenguaje} />
                ))}
              </div>
            </>
          )}

          {lenguajesEnsenar.length > 0 && (
            <>
              <div className='fila4-perfil'>
                <h2>🏆 Puedo enseñar:</h2>
              </div>
              <div className='fila4-perfil'>
                {lenguajesEnsenar.map((lenguaje, index) => (
                  <TarjetaHome key={index} title={lenguaje} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="sugerencias-perfil">
          <div className='intereses-perfil'>
            <p className="titulo-intereses">Podría interesarte</p>
            {/* Datos de ejemplo - podrías conectar esto a tu API también */}
            <InteresPerfil
              nombre="Carlos"
              info="Experto en React y Node.js. Disponible para sesiones de estudio."
            />
            <InteresPerfil
              nombre="Ana"
              info="Frontend developer con experiencia en CSS y JavaScript."
            />
            <InteresPerfil
              nombre="David"
              info="Backend developer especializado en Python y bases de datos."
            />
          </div>
        </div>

        {modalAbierto && (
          <EditarPerfilModal 
            cerrar={() => {
              setModalAbierto(false);
              navigate("/miPerfil");
            }}
            usuarioId={usuario?.id}
            onActualizar={actualizarPerfil}
          />
        )}
      </div>
    </div>
  );
}

export default MiPerfil;