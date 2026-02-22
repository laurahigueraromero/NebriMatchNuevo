import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, crearUsuario, subirFotoPerfil } from "../services/api";
import "../App.css"; // Asegúrate de que los estilos anteriores estén aquí
import { User, Plus, Check, Upload } from "lucide-react";

const LENGUAJES = [
  "JavaScript", "Python", "Java", "React", "Node.js",
  "CSS", "MySQL", "MongoDB", "TypeScript", "PHP"
];

function Login() {
  const navigate = useNavigate();
  const [vista, setVista] = useState("inicio");
  const [error, setError] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registro, setRegistro] = useState({
    nombre_usuario: "",
    email: "",
    password: "",
    rol: "",
    lenguajes_a_ensenar: "",
    lenguajes_a_aprender: "",
    descripcion: ""
  });

  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await login(email, password);
      if (res.usuario) {
        sessionStorage.setItem('usuario_nebrimatch', JSON.stringify(res.usuario));
        sessionStorage.setItem('token', res.token); 
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

    if (!registro.nombre_usuario || !registro.email || !registro.password) {
      setError("Por favor rellena todos los campos");
      return;
    }

    if (!registro.rol) {
      setError("Por favor selecciona un perfil");
      return;
    }

    if (registro.rol === "profesor" && !registro.lenguajes_a_ensenar) {
      setError("Por favor selecciona al menos un lenguaje que enseñas");
      return;
    }

    try {
      const res = await crearUsuario(registro);
      const nuevoUsuarioId = res.id || (res.usuario && res.usuario.id);

      if (nuevoUsuarioId) {
        if (fotoPerfil) {
          try {
            await subirFotoPerfil(nuevoUsuarioId, fotoPerfil);
          } catch (fotoErr) {
            console.error("El usuario se creó pero la foto falló", fotoErr);
          }
        }

        setVista("login");
        setEmail(registro.email);
        setPassword(registro.password);
        alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
      } else {
        setError(res.error || "No se pudo obtener el ID del usuario al registrar");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  const handleRegistroChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFotoPerfil(e.target.files[0]);
      setNombreArchivo(e.target.files[0].name);
    }
  };

  const handleLenguajes = (e, campo) => {
    const seleccionados = Array.from(e.target.selectedOptions, op => op.value).join(', ');
    setRegistro({ ...registro, [campo]: seleccionados });
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
              <span><User /> <Check /></span>
              <span><User /> <Plus /></span>
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

            {/* ====== INPUT FOTO BONITO LIMPIO ====== */}
            <div className="upload-container">
              <label className="upload-label">
                Foto de perfil (Opcional):
              </label>
              
              <div className="upload-btn-wrapper">
                <label 
                  htmlFor="file-upload-login" 
                  className="btn-upload-style"
                >
                  <Upload size={18} /> Seleccionar archivo
                </label>
                <span className="upload-filename">
                  {nombreArchivo || "Ningún archivo seleccionado"}
                </span>
              </div>

              <input
                id="file-upload-login"
                type="file"
                name="foto_perfil"
                accept="image/*"
                onChange={handleFotoChange}
                className="hidden-input"
              />
            </div>
            {/* =============================== */}

            <select
              name="rol"
              className="input-field-select"
              onChange={handleRegistroChange}
            >
              <option value="">Selecciona tu perfil...</option>
              <option value="estudiante">Quiero aprender (Alumno)</option>
              <option value="profesor">Quiero enseñar (Profesor)</option>
            </select>

            {registro.rol === "profesor" && (
              <>
                <p className="mentor-hint">
                  Como mentor, cuéntanos más sobre ti:
                </p>

                <label className="mentor-label">
                  ¿Qué lenguajes enseñas? (Ctrl + click para varios)
                </label>
                <select
                  multiple
                  className="input-field-select select-multiple"
                  onChange={(e) => handleLenguajes(e, 'lenguajes_a_ensenar')}
                >
                  {LENGUAJES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>

                <label className="mentor-label">
                  ¿Qué lenguajes quieres aprender? (Ctrl + click para varios)
                </label>
                <select
                  multiple
                  className="input-field-select select-multiple"
                  onChange={(e) => handleLenguajes(e, 'lenguajes_a_aprender')}
                >
                  {LENGUAJES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>

                <textarea
                  name="descripcion"
                  placeholder="Descríbete como mentor (experiencia, metodología...)"
                  onChange={handleRegistroChange}
                  rows={3}
                  className="input-field-textarea"
                />
              </>
            )}

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