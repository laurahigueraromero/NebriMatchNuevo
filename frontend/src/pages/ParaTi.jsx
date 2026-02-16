import React, { useState } from 'react';
import Header from '../components/Header';
import { mentoresData } from '../data/listaMentores';
import { X, Heart, Maximize2, Minimize2 } from 'lucide-react'; 
import '../App.css';
import './ParaTi.css'

function ParaTi() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState('');
  
  // Controla si las cartas están desplegadas (alas) o cerradas
  const [isOpened, setIsOpened] = useState(false);

  // LOGICA MATCH (IZQUIERDA)
  const handleMatch = () => {
    // Si está cerrado, lo abrimos visualmente al interactuar
    if (!isOpened) setIsOpened(true);

    setSwipeDirection('slide-out-left');
    
    // Guardar en LocalStorage
    const mentorActual = mentoresData[currentIndex];
    const chatsGuardados = JSON.parse(localStorage.getItem('mis_chats_nebrimatch')) || [];
    
    if (!chatsGuardados.find(c => c.id === mentorActual.id)) {
        chatsGuardados.push(mentorActual);
        localStorage.setItem('mis_chats_nebrimatch', JSON.stringify(chatsGuardados));
    }

    // Esperar a la animación
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
    // Avanzamos al siguiente o volvemos al principio
    if (currentIndex < mentoresData.length - 1) {
        setCurrentIndex(currentIndex + 1);
    } else {
        alert("¡No hay más mentores por hoy!");
        setCurrentIndex(0);
    }
  };

  // Definimos las 3 cartas visibles
  const card1 = mentoresData[currentIndex];
  const card2 = mentoresData[currentIndex + 1] || null;
  const card3 = mentoresData[currentIndex + 2] || null;

  if (!card1) return <div className="app-layout"><Header /><h2>Cargando...</h2></div>;

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

      </div>
    </div>
  );
}

export default ParaTi;