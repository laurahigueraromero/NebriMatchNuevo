import React, { useState } from "react";
import "./Chats.css";
import Header from "../componentes/Header"; 

function Chats() {
  const listaChats = [
    { id: 1, nombre: "Usuario 1", ultimoMensaje: "Último mensaje", hora: "12:10" },
    { id: 2, nombre: "Usuario 2", ultimoMensaje: "¿Tienes los apuntes?", hora: "12:20" },
    { id: 3, nombre: "Usuario 3", ultimoMensaje: "Gracias!", hora: "12:30" },
    { id: 4, nombre: "Usuario 4", ultimoMensaje: "Nos vemos luego", hora: "12:40" },
  ];

  const mensajesIniciales = [
    { id: 1, emisor: "U1", texto: "Hola 👋", hora: "12:10", esMio: false },
    { id: 2, emisor: "YO", texto: "Hey! ¿Qué tal?", hora: "12:11", esMio: true },
  ];

  const [chatActivo, setChatActivo] = useState(1);
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  const chatActual = listaChats.find(chat => chat.id === chatActivo) || listaChats[0];

  const enviarMensaje = (e) => {
    e.preventDefault(); 
    if (!nuevoMensaje.trim()) return;

    const mensajeNuevo = {
      id: Date.now(),
      emisor: "YO",
      texto: nuevoMensaje,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      esMio: true
    };

    setMensajes([...mensajes, mensajeNuevo]);
    setNuevoMensaje(""); 
  };

  return (
    <div className="app-layout">
      <Header />
      
      <div className="nm-page">
        <div className="nm-chat-layout">
          
          <aside className="nm-sidebar">
            <div className="nm-sidebar-header">
              <h3>Mensajes</h3>
              <button className="nm-btn-new">+</button>
            </div>

            <div className="nm-sidebar-search">
              <input type="text" placeholder="Buscar conversación..." />
            </div>

            <div className="nm-chat-list">
              {listaChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`nm-chat-item ${chatActivo === chat.id ? "active" : ""}`}
                  onClick={() => setChatActivo(chat.id)}
                >
                  <div className="nm-avatar">U{chat.id}</div>
                  <div className="nm-chat-info">
                    <div className="nm-chat-top">
                      <span className="nm-chat-name">{chat.nombre}</span>
                      <span className="nm-chat-time">{chat.hora}</span>
                    </div>
                    <p className="nm-chat-preview">{chat.ultimoMensaje}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="nm-chat-area">
            
            <div className="nm-chat-header">
              <div className="nm-chat-user">
                <div className="nm-avatar large">U{chatActual.id}</div>
                <div>
                  <h4>{chatActual.nombre}</h4>
                  <span className="nm-status">En línea</span>
                </div>
              </div>
            </div>

            <div className="nm-messages">
              <div className="nm-date-divider">
                <span>Hoy</span>
              </div>

              {mensajes.map((msg) => (
                <div key={msg.id} className={`nm-message-row ${msg.esMio ? "me" : ""}`}>
                  <div className="nm-avatar small">{msg.emisor}</div>
                  <div className={`nm-bubble ${msg.esMio ? "me" : ""}`}>
                    <p>{msg.texto}</p>
                    <span className="nm-time">{msg.hora}</span>
                  </div>
                </div>
              ))}
            </div>

            <form className="nm-input-bar" onSubmit={enviarMensaje}>
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
              />
              <button type="submit" className="nm-send-btn">➤</button>
            </form>

          </section>
        </div>
      </div>
    </div>
  );
}

export default Chats;