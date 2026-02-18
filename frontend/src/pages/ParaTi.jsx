import React, { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import { getMentores } from '../services/api';
import { X, Heart, Maximize2, Minimize2, Cross } from 'lucide-react'; 
import '../App.css';
import './ParaTi.css'
import Lottie from "lottie-react";
import fireAnim from "../assets/Fireeee.json";

function ParaTi() {
  const [mentoresData, setMentoresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  // Cargar mentores desde la base de datos
  useEffect(() => {
    getMentores()
      .then(data => {
        console.log('Mentores recibidos de la DB:', data);
        
        
        const mentoresTransformados = data.map(mentor => ({
          id: mentor.id,
          nombre: mentor.nombre_usuario,
          especialidad: mentor.lenguajes_a_ensenar?.split(',')[0]?.trim() || 'Mentor',
          bio: mentor.descripcion || 'Mentor especializado en tecnología',
          imagen: `https://ui-avatars.com/api/?name=${ encodeURIComponent (mentor.nombre_usuario)}&background=d71820&color=fff&size=400&bold=true`,
          online: Math.random() > 0.3, // Para que no siempre este online, sino que haya un pequeño porcentaje de que no haya online
          lenguajes_a_ensenar: mentor.lenguajes_a_ensenar,
          lenguajes_a_aprender: mentor.lenguajes_a_aprender,
          email: mentor.email,
          numero_matches: mentor.numero_matches || 0
        }));
        
        // Para poder mezclar los mentores
        const mentoresMezclados = mentoresTransformados.sort(() => Math.random() - 0.5);
        
        setMentoresData(mentoresMezclados);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar mentores:', err);
        setError('No se pudieron cargar los mentores');
        setLoading(false);
      });
  }, []);

  // LOGICA MATCH
  const handleMatch = async () => {
    if (!isOpened) setIsOpened(true);
    setSwipeDirection('slide-out-left');
    
    const mentorActual = mentoresData[currentIndex];
    const chatsGuardados = JSON.parse(localStorage.getItem('mis_chats_nebrimatch')) || [];
    
    if (!chatsGuardados.find(c => c.id === mentorActual.id)) {
        const matchData = {
          ...mentorActual,
          fechaMatch: new Date().toISOString(),
          ultimoMensaje: `¡Hola! Me interesa aprender ${mentorActual.lenguajes_a_ensenar?.split(',')[0]?.trim()}`,
          tipoMatch: 'mentor'
        };
        
        chatsGuardados.push(matchData);
        localStorage.setItem('mis_chats_nebrimatch', JSON.stringify(chatsGuardados));
        
        console.log(`✅ Match guardado con ${mentorActual.nombre}`);
        
        
    }

    setTimeout(() => { avanzarCarta(); }, 400);
  };

  // LOGICA PASS
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
        // Reiniciar o mostrar mensaje
        alert("¡Has visto todos los mentores! Reiniciando...");
        setCurrentIndex(0);
    }
  };

  // Estados de loading y error
  if (loading) {
    return (
      <div className="app-layout">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <h2>Cargando mentores...</h2>
          <p>Conectando con la base de datos</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-layout">
        <Header />
        <div className="error-container">
          <h2><Cross/> {error}</h2>
          <button onClick={() => window.location.reload()}>
            🔄 Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (mentoresData.length === 0) {
    return (
      <div className="app-layout">
        <Header />
        <div className="no-mentores-container">
          <h2>😔 No hay mentores disponibles</h2>
          <p>No se encontraron mentores en la base de datos</p>
          <button onClick={() => window.location.reload()}>
            🔄 Recargar
          </button>
        </div>
      </div>
    );
  }

  // Definir cartas visibles
  const card1 = mentoresData[currentIndex];
  const card2 = mentoresData[currentIndex + 1] || null;
  const card3 = mentoresData[currentIndex + 2] || null;

  return (
    <div className="app-layout">
      <Header />
      
      <div className="stack-container">
        <h1 className="texto-inicial"
          
        >
          Para Ti
          <div className="emoji-fire">
            
            
            <Lottie animationData={fireAnim} loop={true} />
          </div>
        </h1>
        <p className="subtitle-stack">Conecta con mentores de tu base de datos</p>

        
        <div className={`card-stack ${isOpened ? 'opened' : ''}`}>
          
            
            {card3 && (
                <div className="card card-bottom">
                    <div className="card-image-area">
                        <img src={card3.imagen} alt={card3.nombre} />
                    </div>
                </div>
            )}

           
            {card2 && (
                <div className="card card-middle">
                    <div className="card-image-area">
                        <img src={card2.imagen} alt={card2.nombre} />
                    </div>
                </div>
            )}

            
            <div className={`card card-top ${swipeDirection}`}>
                <div className="card-image-area">
                    <img src={card1.imagen} alt={card1.nombre} />
                    {card1.online && <span className="badge-online">En línea</span>}
                </div>
                
                <div className="card-details">
                    <h2>{card1.nombre}</h2>
                    <span className="card-role">{card1.especialidad}</span>
                    <p className="card-bio">{card1.bio}</p>

                    
                    <div className="mentor-skills-preview">
                      <strong>🎯 Enseña:</strong>
                      <div className="skills-mini">
                        {card1.lenguajes_a_ensenar?.split(',').slice(0, 3).map((skill, i) => (
                          <span key={i} className="skill-mini">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>

                    {/* Mostrar estadísticas */}
                    <div className="mentor-stats-mini">
                      <span>🤝 {card1.numero_matches} matches</span>
                      <span>📧 {card1.email}</span>
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

        
        <nav className={`nav-circle ${isOpened ? 'opened' : ''}`} onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <Minimize2 size={28} color="white"/> : <Maximize2 size={28} color="white"/>}
        </nav>
        
        <p className="hint-text">{isOpened ? "Modo Panorámico" : "Modo Pila"}</p>

        
        <p className="mentor-counter">
          {currentIndex + 1} de {mentoresData.length} mentores
        </p>

        
        <p className="db-indicator">
          🔗 Conectado a NebriMatch DB
        </p>

      </div>
    </div>
  );
}

export default ParaTi;