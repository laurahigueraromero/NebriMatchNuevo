import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, crearUsuario } from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [vista, setVista] = useState("inicio");
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Registro
  const [registro, setRegistro] = useState({
    nombre_usuario: "",
    email: "",
    password: "",
    rol: ""
  });

const handleLogin = async () => {
    setError(null);
    try {
      const res = await login(email, password);
      if (res.usuario) {
        localStorage.setItem("usuario", JSON.stringify(res.usuario));
        navigate("/comunidades");
      } else {
        alert("Usuario no registrado");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

 const handleRegistro = async () => {
  setError(null);
  console.log("📋 Datos a enviar:", registro);
  
  try {
    const res = await crearUsuario(registro);
    console.log("✅ Respuesta recibida:", res);
    
    if (res.id) {
      setVista("login");
      setEmail(registro.email);
      setPassword(registro.password);
    } else {
      console.error("❌ Error en respuesta:", res.error);
      setError(res.error);
    }
  } catch (err) {
    console.error("💥 Error de conexión:", err);
    setError("Error de conexión con el servidor");
  }
};

  const handleRegistroChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="logo-header">
        <h1>NEBRIMATCH</h1>
      </div>
      <div className="login-card">
        {error && <p className="error">{error}</p>}

        {/* INICIO */}
        {vista === "inicio" && (
          <>
            <div className="icons-container">
              <span>👤✓</span>
              <span>👤+</span>
            </div>
            <div className="buttons-container">
              <button className="btn-red" onClick={() => { setVista("login"); setError(null); }}>
                INICIAR SESIÓN
              </button>
              <button className="btn-red" onClick={() => { setVista("registro"); setError(null); }}>
                REGISTRARSE
              </button>
            </div>
          </>
        )}

        {/* LOGIN */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                value={password}
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

        {/* REGISTRO */}
        {vista === "registro" && (
          <div className="formulario2">
            <h2>¡Bienvenido joven programador!</h2>
            <p>¿Qué deseas aprender hoy?</p>

            <input
              type="text"
              name="nombre_usuario"
              placeholder="Nombre Completo"
              onChange={handleRegistroChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Universitario"
              onChange={handleRegistroChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleRegistroChange}
              required
            />

            <select
              name="rol"
              className="input-field-select"
              onChange={handleRegistroChange}
            >
              <option value="">Selecciona tu perfil...</option>
              <option value="estudiante">Quiero aprender (Alumno)</option>
              <option value="profesor">Quiero enseñar (Profesor)</option>
            </select>

            <button className="btn-red" onClick={handleRegistro}>
              CREAR CUENTA
            </button>
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