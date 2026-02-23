import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComunidad, unirseComunidad, getMensajes, inicializarChatComunidad } from "../services/api";
import { io } from "socket.io-client";
import "../App.css";
import Header from "../componentes/Header";
import './DetallesComunidades.css';

import {
  Calendar,
  FileText,
  Users,
  MapPin,
  Clock,
  Download,
  Book,
  Send,
  Plus,
  Code2
} from "lucide-react";

// Socket fuera del componente para que no se recree
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:4004");

// FUNCIÓN SEGURA (Usa Emojis, imposibles de fallar)
const getIconoTecnologia = (tecnologia) => {
  if (!tecnologia) return "🚀"; 

  const t = tecnologia.toLowerCase();
  
  if (t.includes("react")) return "⚛️";
  if (t.includes("python")) return "🐍";
  if (t.includes("css")) return "🎨";
  if (t.includes("html")) return "🌐";
  if (t.includes("java")) return "☕";
  if (t.includes("node")) return "🟩";
  if (t.includes("docker")) return "🐳";
  if (t.includes("linux")) return "🐧";
  if (t.includes("git")) return "🐙";
  if (t.includes("game") || t.includes("unity")) return "🎮";
  if (t.includes("security") || t.includes("hacking")) return "🛡️";
  if (t.includes("data")) return "📊";
  
  return "💻"; // Icono por defecto
};

function DetallesComunidades() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [mensajeInput, setMensajeInput] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [conversacionId, setConversacionId] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'chat') scrollToBottom();
  }, [mensajes, activeTab]);

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

  // Historial + Socket.IO
  useEffect(() => {
    const cargarHistorial = async () => {
      setLoadingChat(true);
      try {
        // 1. Obtener (o crear) la conversación de esta comunidad
        const { conversacion_id } = await inicializarChatComunidad(id);
        setConversacionId(conversacion_id);

        // 2. Cargar mensajes con el ID real usando getMensajes de api.js
        const data = await getMensajes(conversacion_id);
        const formateados = data.map((msg) => ({
          id: msg.id,
          usuario: msg.emisor,
          texto: msg.texto,
          esMio: msg.id_emisor === usuario?.id,
          hora: new Date(msg.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setMensajes(formateados);

        // 3. Unirse a la sala con el ID correcto
        socket.emit("unirse_conversacion", conversacion_id);

      } catch (err) {
        console.error("Error cargando historial:", err);
      } finally {
        setLoadingChat(false);
      }
    };

    cargarHistorial();

    // Escuchar mensajes nuevos en tiempo real
    socket.on("nuevo_mensaje", (nuevoMensaje) => {
      setMensajes((prev) => [...prev, {
        id: nuevoMensaje.id,
        usuario: nuevoMensaje.emisor || "Usuario",
        texto: nuevoMensaje.texto,
        esMio: nuevoMensaje.id_emisor === usuario?.id,
        hora: new Date(nuevoMensaje.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    });

    // Limpieza al desmontar o cambiar de comunidad
    return () => socket.off("nuevo_mensaje");
  }, [id]);

  const handleUnirse = async () => {
    if (!usuario) {
      setMensaje("Debes iniciar sesión primero");
      return;
    }
    try {
      const res = await unirseComunidad(id, usuario.id);
      setMensaje(res.mensaje || res.error);
      const data = await getComunidad(id);
      setComunidad(data);
    } catch (err) {
      console.error(err);
    }
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensajeInput.trim() || !usuario || !conversacionId) return;

    // Emitir por Socket.IO (el servidor lo guarda en BD y hace broadcast)
    socket.emit("enviar_mensaje", {
      conversacion_id: conversacionId,
      remitente_id: usuario.id,
      mensaje: mensajeInput
    });

    setMensajeInput("");
  };

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

  const yaMiembro = comunidad?.miembros?.some((m) => m.id === usuario?.id);

  if (loading) return <div className="app-layout"><Header /><p>Cargando...</p></div>;
  if (!comunidad || comunidad.mensaje) return <div className="app-layout"><Header /><p>Comunidad no encontrada</p></div>;

  const eventos = [
    { dia: "15", mes: "OCT", titulo: "Taller de Iniciación", hora: "17:30", lugar: "Aula 204" },
    { dia: "22", mes: "OCT", titulo: "Networking & Pizzas", hora: "19:00", lugar: "Cafetería" }
  ];

  const recursos = [
    { tipo: "PDF", nombre: "Guía de estudio 2024", tamano: "2.4 MB", url: "/docs/guia.pdf" },
    { tipo: "PDF", nombre: "Normativa del Grupo", tamano: "1.1 MB", url: "/docs/normas.pdf" },
    { tipo: "PDF", nombre: "Ejercicios para principiantes", tamano: "3.4MB", url: "/docs/ejercicios.pdf" }
  ];

  return (
    <div className="app-layout">
      <Header />
      <div className="detalle-content">
        
        {/* BANNER */}
        <div className="grupo-header-card">
          <div className="grupo-icono-wrapper">
            {/* Usamos la función de emojis segura */}
            {getIconoTecnologia(comunidad.lenguaje_asociado)}
          </div>
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
                <h3><Book /> Descripción</h3>
                <p>{comunidad.descripcion}</p>
              </div>
              <div className="section-box">
                <h3><Calendar /> Información General</h3>
                <p><strong>Fecha de creación:</strong> {new Date(comunidad.fecha_creacion).toLocaleDateString("es-ES")}</p>
                <p><strong>Tecnología:</strong> {comunidad.lenguaje_asociado}</p>
              </div>
              <div className="miembros-section">
                <h3><Users /> Miembros ({comunidad.miembros ? comunidad.miembros.length : 0})</h3>
                {comunidad.miembros && comunidad.miembros.length > 0 ? (
                  comunidad.miembros.map((m) => (
                    <div key={m.id} className="miembro-item">
                      <span>👤 {m.nombre_usuario}</span>
                    </div>
                  ))
                ) : <p>No hay miembros todavía</p>}
              </div>
            </div>
          )}

          {/* CHAT */}
          {activeTab === 'chat' && (
            <div className="animate-fade-in chat-container-full">
              <div className="chat-messages-area">
                <div className="chat-date-divider"><span>Hoy</span></div>
                {loadingChat ? (
                  <p style={{ textAlign: "center", color: "#888" }}>Cargando mensajes...</p>
                ) : mensajes.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#888" }}>Sé el primero en escribir 👋</p>
                ) : (
                  mensajes.map((msg) => (
                    <div key={msg.id} className={`chat-row ${msg.esMio ? 'chat-row-me' : ''}`}>
                      {!msg.esMio && <div className="chat-avatar">{msg.usuario.charAt(0)}</div>}
                      <div className="chat-bubble">
                        {!msg.esMio && <span className="chat-username">{msg.usuario}</span>}
                        <p>{msg.texto}</p>
                        <span className="chat-time">{msg.hora}</span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              <form className="chat-input-bar" onSubmit={enviarMensaje}>
                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
                <button type="button" className="btn-icon-chat" onClick={() => fileInputRef.current.click()}>
                  <Plus />
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={mensajeInput}
                  onChange={(e) => setMensajeInput(e.target.value)}
                />
                <button type="submit" className="btn-send-chat">
                  <Send size={20} color="white" />
                </button>
              </form>
            </div>
          )}

          {/* EVENTOS */}
          {activeTab === 'eventos' && (
            <div className="animate-fade-in">
              <h3><Calendar /> Próximas Reuniones</h3>
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
                    <a href={rec.url} download className="btn-download"><Download /></a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="btn-black btn-margin-top" onClick={() => navigate("/comunidades")}>
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default DetallesComunidades;