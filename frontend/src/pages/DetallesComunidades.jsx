import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComunidad, unirseComunidad } from "../services/api";
import "../App.css";
import Header from "../componentes/Header";

import {
  Calendar,
  FileText,
  User,
  Users,
  MapPin,
  Clock,
  Download,
  Book,
  Cross,
  Crown,
  FileWarningIcon,
  ArchiveIcon,
  MessageCircle,
  Send,
  Plus,
} from "lucide-react";

function DetallesComunidades() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  // 1. ESTADO DE LAS PESTAÑAS
  const [activeTab, setActiveTab] = useState('info');

  // 2. ESTADO DEL CHAT
  const [mensajeInput, setMensajeInput] = useState("");
  const [mensajes, setMensajes] = useState([
    { id: 1, usuario: "Carlos (Mentor)", texto: "¡Bienvenidos a todos al nuevo semestre! 🚀", esMio: false, hora: "09:30" },
    { id: 2, usuario: "Ana García", texto: "¿Alguien tiene los apuntes de ayer?", esMio: false, hora: "09:35" },
    { id: 3, usuario: "David R.", texto: "Sí, los acabo de subir a la pestaña Recursos.", esMio: false, hora: "09:42" }
  ]);
  
  // 3. REF PARA EL SCROLL AUTOMÁTICO
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 4. FUNCIÓN PARA SCROLL AUTOMÁTICO
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 5. SCROLL AUTOMÁTICO CUANDO CAMBIAN MENSAJES O PESTAÑA
  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [mensajes, activeTab]);

  // 6. CARGAR DATOS DE LA COMUNIDAD
  useEffect(() => {
    getComunidad(id)
      .then((data) => {
        setComunidad(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // 7. FUNCIÓN PARA UNIRSE A LA COMUNIDAD
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

  // 8. FUNCIÓN PARA ENVIAR MENSAJE
  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensajeInput.trim()) return;

    const nuevoMsg = {
      id: Date.now(),
      usuario: usuario?.nombre_usuario || "Yo",
      texto: mensajeInput,
      esMio: true,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensajes([...mensajes, nuevoMsg]);
    setMensajeInput("");

    // Respuesta automática simulada
    setTimeout(() => {
        const respuestaBot = {
            id: Date.now() + 1,
            usuario: "Carlos (Mentor)",
            texto: "¡Buena aportación!",
            esMio: false,
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMensajes(prev => [...prev, respuestaBot]);
    }, 2000);
  };

  // 9. FUNCIÓN PARA SUBIR ARCHIVOS
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const nuevoMsg = {
      id: Date.now(),
      usuario: usuario?.nombre_usuario || "Yo",
      texto: `📎 Archivo compartido: ${file.name}`,
      esMio: true,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMensajes(prev => [...prev, nuevoMsg]);
    e.target.value = null;
  };

  // Comprobar si el usuario ya es miembro
  const yaMiembro = comunidad?.miembros?.some((m) => m.id === usuario?.id);

  if (loading) return <p>Cargando...</p>;
  if (!comunidad || comunidad.mensaje) return <p>Comunidad no encontrada</p>;

  // --- DATOS SIMULADOS PARA EVENTOS Y RECURSOS ---
  const eventos = [
    { dia: "15", mes: "OCT", titulo: "Taller de Iniciación", hora: "17:30", lugar: "Aula 204" },
    { dia: "22", mes: "OCT", titulo: "Networking & Pizzas", hora: "19:00", lugar: "Cafetería" }
  ];

  const recursos = [
    { tipo: "PDF", nombre: "Guía de estudio 2024", tamano: "2.4 MB", url: "/docs/guia.pdf" },
    { tipo: "PDF", nombre: "Normativa del Grupo", tamano: "1.1 MB", url: "/docs/normas.pdf" },
    { tipo: "PDF", nombre: "Ejercicios Resueltos", tamano: "4.5 MB", url: "/docs/ejercicios.pdf" }
  ];

  return (
    <div className="app-layout">
      <Header />
      <div className="detalle-content">
        
        {/* BANNER */}
        <div className="grupo-header-card">
            <div className="grupo-icono-wrapper">🚀</div>
            <div className="grupo-header-info">
                <span className="badge-categoria">{comunidad.lenguaje_asociado}</span>
                <h1>{comunidad.nombre}</h1>
                <p className="subtitulo-miembros">
                  <Users /> {comunidad.miembros ? comunidad.miembros.length : 0} miembros
                </p>
            </div>
            {yaMiembro ? (
              <span className="btn-joined">✅ Miembro</span>
            ) : (
              <button className="btn-join" onClick={handleUnirse}>Unirme ahora</button>
            )}
        </div>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {/* TABS */}
        <div className="tabs-container">
            <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
              Información
            </button>
            <button className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
              Nebricord
            </button>
            <button className={`tab-btn ${activeTab === 'eventos' ? 'active' : ''}`} onClick={() => setActiveTab('eventos')}>
              Eventos
            </button>
            <button className={`tab-btn ${activeTab === 'recursos' ? 'active' : ''}`} onClick={() => setActiveTab('recursos')}>
              Recursos
            </button>
        </div>

        <div className="tab-content">
            
            {/* INFO */}
            {activeTab === 'info' && (
                <div className="animate-fade-in">
                    <div className="section-box">
                        <h3><Book/> Descripción</h3>
                        <p>{comunidad.descripcion}</p>
                    </div>
                    
                    <div className="section-box">
                        <h3><Calendar/> Información General</h3>
                        <p>
                          <strong>Fecha de creación:</strong>{" "}
                          {new Date(comunidad.fecha_creacion).toLocaleDateString("es-ES")}
                        </p>
                        <p><strong>Lenguaje:</strong> {comunidad.lenguaje_asociado}</p>
                    </div>

                    <div className="miembros-section">
                      <h3>
                        <Users/> Miembros ({comunidad.miembros ? comunidad.miembros.length : 0})
                      </h3>
                      {comunidad.miembros && comunidad.miembros.length > 0 ? (
                        comunidad.miembros.map((m) => (
                          <div key={m.id} className="miembro-item">
                            <span>👤 {m.nombre_usuario}</span>
                            <span>
                              Unido: {new Date(m.fecha_union).toLocaleDateString("es-ES")}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>No hay miembros todavía</p>
                      )}
                    </div>
                </div>
            )}

            {/* CHAT */}
            {activeTab === 'chat' && (
                <div className="animate-fade-in chat-container-full">
                    <div className="chat-messages-area">
                        <div className="chat-date-divider"><span>Hoy</span></div>
                        
                        {mensajes.map((msg) => (
                            <div key={msg.id} className={`chat-row ${msg.esMio ? 'chat-row-me' : ''}`}>
                                {!msg.esMio && <div className="chat-avatar">{msg.usuario.charAt(0)}</div>}
                                
                                <div className="chat-bubble">
                                    {!msg.esMio && <span className="chat-username">{msg.usuario}</span>}
                                    <p>{msg.texto}</p>
                                    <span className="chat-time">{msg.hora}</span>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-input-bar" onSubmit={enviarMensaje}>
                        <button type="button" className="btn-icon-chat">
                          <Plus/>
                        </button>
                        <input 
                            type="text" 
                            placeholder={`Enviar mensaje a #${comunidad.nombre.replace(/\s+/g, '-').toLowerCase()}...`}
                            value={mensajeInput}
                            onChange={(e) => setMensajeInput(e.target.value)}
                        />
                        <button type="submit" className="btn-send-chat">
                            <Send />
                        </button>
                    </form>

                    {/* Input oculto para archivos */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                    />
                </div>
            )}

            {/* EVENTOS */}
            {activeTab === 'eventos' && (
                <div className="animate-fade-in">
                     <h3><Calendar/> Próximas Reuniones</h3>
                     <div className="events-grid">
                        {eventos.map((ev, index) => (
                            <div key={index} className="event-card">
                                <div className="date-box">
                                    <span className="date-day">{ev.dia}</span>
                                    <span className="date-month">{ev.mes}</span>
                                </div>
                                <div className="event-info">
                                    <h4>{ev.titulo}</h4>
                                    <div className="event-meta">
                                        <span><Clock /> {ev.hora}</span>
                                        <span><MapPin /> {ev.lugar}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* RECURSOS */}
            {activeTab === 'recursos' && (
                <div className="animate-fade-in">
                    <h3>📂 Archivos Compartidos</h3>
                    <div className="resources-list">
                        {recursos.map((rec, index) => (
                             <div key={index} className="resource-item">
                                <div className="resource-icon"><FileText /></div>
                                <div className="resource-info">
                                    <strong>{rec.nombre}</strong>
                                    <span>{rec.tipo} • {rec.tamano}</span>
                                </div>
                                <a href={rec.url} download className="btn-download">
                                  <Download />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>

        <button
          className="btn-black btn-margin-top"
          onClick={() => navigate("/comunidades")}
        >
          Volver atrás
        </button>
        
      </div>
    </div>
  );
}

export default DetallesComunidades;