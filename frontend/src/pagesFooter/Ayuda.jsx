import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../componentes/Header";


function Ayuda() {
  const navigate = useNavigate();
  return (
    <div className="app-layout">
      <Header />
      <div className="ayuda-container">
        <h1>Centro de Ayuda</h1>
        <p>
          Bienvenido al centro de ayuda. Aquí encontrarás respuestas a preguntas
          frecuentes y guías rápidas para aprovechar al máximo nuestra
          plataforma.
        </p>

        <section className="faq-section">
          <h2>Preguntas frecuentes</h2>
          <div className="faq-item">
            <h3>¿Cómo puedo registrarme?</h3>
            <p>
              Para registrarte, ve a la página de inicio y haz clic en "Crear
              cuenta". Completa el formulario con tus datos y sigue las
              instrucciones enviadas a tu correo electrónico.
            </p>
          </div>
          <div className="faq-item">
            <h3>¿Cómo recuperar mi contraseña?</h3>
            <p>
              En la página de inicio de sesión, haz clic en "¿Olvidaste tu
              contraseña?" y sigue los pasos para restablecerla.
            </p>
          </div>
          <div className="faq-item">
            <h3>
              ¿Cómo puedo cambiar mi correo electrónico o datos de perfil?
            </h3>
            <p>
              Ve a tu perfil y selecciona "Editar información". Ahí podrás
              actualizar tu correo electrónico, nombre y otros datos personales.
            </p>
          </div>
          <div className="faq-item">
            <h3>¿Cómo funcionan las comunidades?</h3>
            <p>
              Las comunidades te permiten interactuar con otros usuarios con
              intereses similares. Puedes unirte, participar en debates y
              publicar contenido propio.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Ayuda;
