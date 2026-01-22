import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


function Login() {
  const navigate = useNavigate();
  const [vista, setVista] = useState("inicio");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Intentando entrar con:", email, password);

    navigate("/comunidades");
  };
  return (
    <div className="login-container">
      <div className="logo-header">
        <h1>NEBRIMATCH</h1>
      </div>
      <div className="login-card">
        /*INICIO*/
        {vista === "inicio" && (
          <>
            <div className="icons-container">
              <span>👤✓</span>
              <span>👤+</span>
            </div>

            <div className="buttons-container">
              <button className="btn-red" onClick={() => setVista("login")}>
                INICIAR SESIÓN
              </button>
              <button className="btn-red" onClick={() => setVista("registro")}>
                REGISTRARSE
              </button>
            </div>
          </>
        )}
        /*LOGIN */
        {vista === "login" && (
          <div className="form-container">
            <div className="icon-form">
              <span>👤</span>
            </div>
            <div className="formulario">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="botones-separados">
              <button className="btn-red-form" onClick={handleLogin}>
                ENTRAR
              </button>
              <button className="btn-black" onClick={() => setVista("inicio")}>
                VOLVER
              </button>
            </div>
          </div>
        )}
        /*REGISTRO(formulario) */
        {vista === "registro" && (
          <div className="formulario2">
            <h2>¡Bienvenido joven programador!</h2>
            <p>¿Qué deseas aprender hoy?</p>

            <input type="text" placeholder="Nombre Completo" required />
            <input type="email" placeholder="Email Universitario" required />
            <input type="password" placeholder="Contraseña" required />

            <select className="input-field-select">
              <option value="">Selecciona tu perfil...</option>
              <option value="alumno">Quiero aprender (Alumno)</option>
              <option value="profesor">Quiero enseñar (Profesor)</option>
              <option value="ambos">Ambos</option>
            </select>

            <button className="btn-red">CREAR CUENTA</button>
            <button className="btn-black" onClick={() => setVista("inicio")}>
              VOLVER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
