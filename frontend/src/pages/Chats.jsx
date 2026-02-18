import React from "react";
import "./Chats.css";
// import Header from "../componentes/Header"; // Descomenta esto si quieres poner el Header arriba

function Chats() {
  // 1. DATOS FICTICIOS (Esto hace que el HTML de abajo quede mucho más limpio)
  // En el futuro, esto vendrá de tu base de datos (backend)
  const listaChats = [
    { id: 1, nombre: "Usuario 1", ultimoMensaje: "Último mensaje", hora: "12:10", activo: true },
    { id: 2, nombre: "Usuario 2", ultimoMensaje: "¿Tienes los apuntes?", hora: "12:20", activo: false },
    { id: 3, nombre: "Usuario 3", ultimoMensaje: "Gracias!", hora: "12:30", activo: false },
    { id: 4, nombre: "Usuario 4", ultimoMensaje: "Nos vemos luego", hora: "12:40", activo: false },
  ];

  const mensajesChat = [
    { id: 1, emisor: "U1", texto: "Hola 👋", hora: "12:10", esMio: false },
    { id: 2, emisor: "YO", texto: "Hey! ¿Qué tal?", hora: "12:11", esMio: true },
  ];

  return (
    <div className="nm-page">
      {/* <Header /> */}
      
      <div className="nm-chat-layout">
        
        {/* ================= BARRA LATERAL (LISTA DE CHATS) ================= */}
        <aside className="nm-sidebar">
          
          <div className="nm-sidebar-header">
            <h3>Mensajes</h3>
            <button className="nm-btn-new">+</button>
          </div>

          <div className="nm-sidebar-search">
            <input type="text" placeholder="Buscar conversación..." />
          </div>

          <div className="nm-chat-list">
            {/* Aquí generamos la lista de contactos automáticamente */}
            {listaChats.map((chat) => (
              <div
                key={chat.id}
                // ¡AQUÍ ESTABA EL ERROR DE TU COMPAÑERA! Faltaban las comillas invertidas ``
                className={`nm-chat-item ${chat.activo ? "active" : ""}`}
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

        {/* ================= ÁREA PRINCIPAL DEL CHAT ================= */}
        <section className="nm-chat-area">
          
          {/* 1. Cabecera (Con quién hablo) */}
          <div className="nm-chat-header">
            <div className="nm-chat-user">
              <div className="nm-avatar large">U1</div>
              <div>
                <h4>Usuario 1</h4>
                <span className="nm-status">En línea</span>
              </div>
            </div>
          </div>

          {/* 2. Historial de mensajes */}
          <div className="nm-messages">
            <div className="nm-date-divider">
              <span>Hoy</span>
            </div>

            {/* Generamos los mensajes automáticamente leyendo el array de arriba */}
            {mensajesChat.map((msg) => (
              <div key={msg.id} className={`nm-message-row ${msg.esMio ? "me" : ""}`}>
                <div className="nm-avatar small">{msg.emisor}</div>
                <div className={`nm-bubble ${msg.esMio ? "me" : ""}`}>
                  <p>{msg.texto}</p>
                  <span className="nm-time">{msg.hora}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Barra para escribir */}
          <div className="nm-input-bar">
            <input type="text" placeholder="Escribe un mensaje..." />
            <button className="nm-send-btn">➤</button>
          </div>

        </section>
      </div>
    </div>
  );
}

export default Chats; // Esto es el formato rfce (exportar abajo)