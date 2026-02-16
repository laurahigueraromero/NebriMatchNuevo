import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import { getMentores } from '../services/api'; // ✅ Cambiar de datos estáticos a API
import { X, Heart, Maximize2, Minimize2 } from 'lucide-react'; 
import '../App.css';
import './ParaTi.css'

function ParaTi() {
  const [mentoresData, setMentoresData] = useState([]); // ✅ Estado para mentores de la DB
  const [loading, setLoading] = useState(true); // ✅ Estado de carga
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  // ✅ Cargar mentores desde la base de datos
  useEffect(() => {
    getMentores()
      .then(data => {
        // Transformar datos de la DB al formato que espera tu componente
        const mentoresTransformados = data.map(mentor => ({
          id: mentor.id,
          nombre: mentor.nombre_usuario,
          especialidad: mentor.lenguajes_a_ensenar?.split(',')[0]?.trim() || 'Mentor',
          bio: mentor.descripcion || 'Mentor especializado en tecnología',
          imagen: `https://ui-avatars.com/api/?name=${mentor.nombre_usuario}&background=d71820&color=fff&size=400`, // ✅ Avatar generado
          online: Math.random() > 0.5, // ✅ Estado online aleatorio
          lenguajes_a_ensenar: mentor.lenguajes_a_ensenar,
          lenguajes_a_aprender: mentor.lenguajes_a_aprender,
          email: mentor.email
        }));
        setMentoresData(mentoresTransformados);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar mentores:', err);
        setLoading(false);
      });
  }, []);

  // LOGICA MATCH (IZQUIERDA)
  const handleMatch = () => {
    if (!isOpened) setIsOpened(true);
    setSwipeDirection('slide-out-left');
    
    // Guardar en LocalStorage
    const mentorActual = mentoresData[currentIndex];
    const chatsGuardados = JSON.parse(localStorage.getItem('mis_chats_nebrimatch')) || [];
    
    if (!chatsGuardados.find(c => c.id === mentorActual.id)) {
        chatsGuardados.push({
          ...mentorActual,
          fechaMatch: new Date().toISOString() // ✅ Añadir fecha del match
        });
        localStorage.setItem('mis_chats_nebrimatch', JSON.stringify(chatsGuardados));
        console.log(`¡Match con ${mentorActual.nombre}!`); // ✅ Log para debug
    }

    setTimeout(() => { avanzarCarta(); }, 400);
  };

  // LOGICA PASS (DERECHA)
  const handlePass = () => {
    if (!isOpened) setIsOpened(true);
    setSwipeDirection('slide-out-right');
    setTimeout(() => { avanzarCarta(); }, 400);
  };

  const avanzarCarta = () => {
    setSwipeDirection('');
    if (currentIndex < mentoresData.length - 1) {
        setCurrentIndex(currentIndex + 1);
    } else {
        alert("¡No hay más mentores por hoy!");
        setCurrentIndex(0);
    }
  };

  // ✅ Mostrar loading mientras cargan los datos
  if (loading) {
    return (
      <div className="app-layout">
        <Header />
        <div className="loading-container">
          <h2>⏳ Cargando mentores...</h2>
        </div>
      </div>
    );
  }

  // ✅ Mostrar mensaje si no hay mentores
  if (mentoresData.length === 0) {
    return (
      <div className="app-layout">
        <Header />
        <div className="no-mentores-container">
          <h2>😔 No hay mentores disponibles</h2>
          <p>Vuelve más tarde para encontrar nuevos mentores</p>
        </div>
      </div>
    );
  }

  // Definimos las 3 cartas visibles
  const card1 = mentoresData[currentIndex];
  const card2 = mentoresData[currentIndex + 1] || null;
  const card3 = mentoresData[currentIndex + 2] || null;

  return (
    <div className="app-layout">
      <Header />
      
      <div className="stack-container">
        <h1>Para Ti 🔥</h1>
        <p className="subtitle-stack">Encuentra a tu mentor ideal</p>

        {/* CONTENEDOR DEL MAZO */}
        <div className={`card-stack ${isOpened ? 'opened' : ''}`}>
          
            {/* CARTA 3 (FONDO - IZQUIERDA) */}
            {card3 && (
                <div className="card card-bottom">
                    <div className="card-image-area">
                        <img src={card3.imagen} alt={card3.nombre} />
                    </div>
                </div>
            )}

            {/* CARTA 2 (FONDO - DERECHA) */}
            {card2 && (
                <div className="card card-middle">
                    <div className="card-image-area">
                        <img src={card2.imagen} alt={card2.nombre} />
                    </div>
                </div>
            )}

            {/* CARTA 1 (PRINCIPAL - CENTRO) */}
            <div className={`card card-top ${swipeDirection}`}>
                <div className="card-image-area">
                    <img src={card1.imagen} alt={card1.nombre} />
                    {card1.online && <span className="badge-online">En línea</span>}
                </div>
                
                <div className="card-details">
                    <h2>{card1.nombre}</h2>
                    <span className="card-role">{card1.especialidad}</span>
                    <p className="card-bio">{card1.bio}</p>

                    {/* ✅ Mostrar habilidades del mentor */}
                    <div className="mentor-skills-preview">
                      <strong>🎯 Enseña:</strong>
                      <div className="skills-mini">
                        {card1.lenguajes_a_ensenar?.split(',').slice(0, 3).map((skill, i) => (
                          <span key={i} className="skill-mini">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>

                    <div className="action-buttons-row">
                        <button className="btn-action match" onClick={handleMatch}>
                            <Heart fill="white" size={24} /> Match
                        </button>
                         <button className="btn-action pass" onClick={handlePass}>
                            <X size={24} /> Pasar
                        </button>
                    </div>
                </div>
            </div>

        </div>

        {/* BOTÓN REDONDO */}
        <nav className={`nav-circle ${isOpened ? 'opened' : ''}`} onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <Minimize2 size={28} color="white"/> : <Maximize2 size={28} color="white"/>}
        </nav>
        
        <p className="hint-text">{isOpened ? "Modo Panorámico" : "Modo Pila"}</p>

        {/* ✅ Contador de mentores */}
        <p className="mentor-counter">
          {currentIndex + 1} de {mentoresData.length} mentores
        </p>

      </div>
    </div>
  );
}

export default ParaTi;