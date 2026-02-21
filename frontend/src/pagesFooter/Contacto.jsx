import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../componentes/Header";
import { enviarContacto } from "../services/api"; 
function Contacto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [estado, setEstado] = useState(null); // 'exito' | 'error'
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setCargando(true);
  setEstado(null);

  try {
    await enviarContacto(formData);
    setEstado("exito");
    setFormData({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => navigate("/"), 2000);
  } catch (error) {
    console.error(error);
    setEstado("error");
  } finally {
    setCargando(false);
  }
};

  return (
    <div className="app-layout">
      <Header />

      <div className="legal-page">
        <h1>Contacta con nosotros</h1>
        <p>¿Tienes alguna duda o sugerencia? Escríbenos.</p>

        {/* Mensajes de feedback */}
        {estado === "exito" && (
          <p style={{ color: "green" }}>
            ✅ Mensaje enviado. Te responderemos pronto.
          </p>
        )}
        {estado === "error" && (
          <p style={{ color: "red" }}>
            ❌ Hubo un error al enviar. Inténtalo de nuevo.
          </p>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu Email Universitario"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <textarea
            name="mensaje"
            placeholder="¿En qué podemos ayudarte?"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            className="input-field"
            required
          ></textarea>

          <button type="submit" className="btn-red" disabled={cargando}>
            {cargando ? "Enviando..." : "ENVIAR MENSAJE"}
          </button>
        </form>

        <button
          className="btn-black btn-margin-top"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Contacto;