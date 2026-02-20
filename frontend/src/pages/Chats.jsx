import React, { useState, useEffect, useRef } from "react";
import "./Chats.css";
import Header from "../componentes/Header";
import { getChats, getMensajes, enviarMensaje } from "../services/api";

function Chats() {
  const usuarioActual = JSON.parse(localStorage.getItem('usuario_nebrimatch'));

  const [listaChats, setListaChats] = useState([]);
  const [chatActivo, setChatActivo] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const mensajesEndRef = useRef(null);

  // Cargar conversaciones del usuario
  useEffect(() => {
    if (!usuarioActual) return;

    getChats(usuarioActual.nombre_usuario)
      .then(data => {
        setListaChats(data);
        if (data.length > 0) setChatActivo(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando chats:', err);
        setLoading(false);
      });
  }, []);

  // Cargar mensajes cuando cambia el chat activo
  useEffect(() => {
    if (!chatActivo) return;

    getMensajes(chatActivo.id)
      .then(data => setMensajes(data))
      .catch(err => console.error('Error cargando mensajes:', err));
  }, [chatActivo]);

  // Scroll al último mensaje
  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim() || !chatActivo) return;

    try {
      const msgGuardado = await enviarMensaje(chatActivo.id, usuarioActual.id, nuevoMensaje);

      setMensajes(prev => [...prev, {
        ...msgGuardado,
        texto: nuevoMensaje,
        hora: new Date().toISOString(),
        emisor: usuarioActual.nombre_usuario
      }]);

      setNuevoMensaje("");
    } catch (err) {
      console.error('Error enviando mensaje:', err);
    }
  };

  if (!usuarioActual) return (
    <div className="app-layout">
      <Header />
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        Debes iniciar sesión para ver tus chats.
      </p>
    </div>
  );

  if (loading) return (
    <div className="app-layout">
      <Header />
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando chats...</p>
    </div>
  );

  return (
    <div className="app-layout">
      <Header />
      <div className="nm-page">
        <div className="nm-chat-layout">

          {/* SIDEBAR */}
          <aside className="nm-sidebar">
            <div className="nm-sidebar-header">
              <h3>Mensajes</h3>
            </div>
            <div className="nm-sidebar-search">
              <input type="text" placeholder="Buscar conversación..." />
            </div>

            <div className="nm-chat-list">
              {listaChats.length === 0 ? (
                <p style={{ padding: '1rem', color: '#888' }}>
                  Aún no tienes matches. ¡Ve a Para Ti!
                </p>
              ) : (
                listaChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`nm-chat-item ${chatActivo?.id === chat.id ? "active" : ""}`}
                    onClick={() => setChatActivo(chat)}
                  >
                    <div className={`nm-avatar ${chat.rol === 'profesor' ? 'mentor-avatar' : ''}`}>
                      {chat.otro_usuario?.charAt(0).toUpperCase()}
                    </div>
                    <div className="nm-chat-info">
                      <div className="nm-chat-top">
                        <span className="nm-chat-name">
                          {chat.otro_usuario}
                          {chat.rol === 'profesor' && (
                            <span className="badge-mentor">Mentor</span>
                          )}
                        </span>
                        <span className="nm-chat-time">
                          {chat.ultima_actividad
                            ? new Date(chat.ultima_actividad).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : ''}
                        </span>
                      </div>
                      <p className="nm-chat-preview">
                        {chat.ultimo_mensaje || '¡Nuevo match! 🎉'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* ÁREA DE CHAT */}
          <section className="nm-chat-area">
            {!chatActivo ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <p>Selecciona un chat para empezar</p>
              </div>
            ) : (
              <>
                <div className="nm-chat-header">
                  <div className="nm-chat-user">
                    <div className={`nm-avatar large ${chatActivo.rol === 'profesor' ? 'mentor-avatar' : ''}`}>
                      {chatActivo.otro_usuario?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4>{chatActivo.otro_usuario}</h4>
                      <span className="nm-status">
                        {chatActivo.rol === 'profesor' ? 'Mentor' : 'Estudiante'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="nm-messages">
                  <div className="nm-date-divider"><span>Hoy</span></div>

                  {mensajes.map((msg) => {
                    const esMio = msg.id_emisor === usuarioActual.id;
                    const esMentor = chatActivo.rol === 'profesor';

                    return (
                      <div key={msg.id} className={`nm-message-row ${esMio ? "me" : ""}`}>
                        <div className="nm-avatar small">
                          {esMio
                            ? usuarioActual.nombre_usuario?.charAt(0).toUpperCase()
                            : chatActivo.otro_usuario?.charAt(0).toUpperCase()}
                        </div>
                        <div className={`nm-bubble ${esMio ? "me" : ""} ${!esMio && esMentor ? "mentor" : ""}`}>
                          <p>{msg.texto}</p>
                          <span className="nm-time">
                            {new Date(msg.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={mensajesEndRef} />
                </div>

                <form className="nm-input-bar" onSubmit={handleEnviarMensaje}>
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                  />
                  <button type="submit" className="nm-send-btn">➤</button>
                </form>
              </>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

export default Chats;