// const API_URL = 'http://localhost:4004';
const API_URL = 'http://192.168.1.47:4004'
// ============ AUTENTICACIÓN ============

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

// POST crear usuario (registro)
export const crearUsuario = async (datos) => {
  try {
    console.log("🌐 Enviando a:", `${API_URL}/api/usuarios`);
    console.log("📦 Datos:", datos);
    
    const res = await fetch(`${API_URL}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    
    console.log("📡 Response status:", res.status);
    console.log("📡 Response ok:", res.ok);
    
    const data = await res.json();
    console.log("📋 Response data:", data);
    
    // Si hay error HTTP, lanzar excepción
    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("🔥 Error en crearUsuario:", error);
    throw error;
  }
};

// ============ USUARIOS ============

// GET todos los usuarios
export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/api/usuarios`);
  return res.json();
};

// GET perfil por nombre de usuario
export const getPerfilPorNombre = async (nombreUsuario) => {
  const res = await fetch(`${API_URL}/api/usuarios/${nombreUsuario}`);
  return res.json();
};

// GET perfil por ID
export const getPerfil = async (id) => {
  const response = await fetch(`${API_URL}/api/usuarios/id/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.mensaje || 'Error al obtener perfil');
  }
  return response.json();
};

// PUT editar perfil
export const editarPerfil = async (id, datos) => {
  const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al actualizar perfil');
  }
  return response.json();
};

// ============ CHATS ============

// GET conversaciones de un usuario; esto no carga los mensajes si no el sidebar que es lo que esta a la izquierda; no confundir!
export const getChats = async (nombreUsuario) => {
  const res = await fetch(`${API_URL}/api/usuarios/${nombreUsuario}/chats`);
  return res.json();
};
// ============ CONVERSACIONES ============
// este si que carga los mensajes:
export const getMensajes = async (conversacionId) => {
  const res = await fetch(`${API_URL}/api/conversaciones/${conversacionId}/mensajes`);
  return res.json();
};

export const enviarMensaje = async (conversacionId, remitente_id, mensaje) => {
  const res = await fetch(`${API_URL}/api/conversaciones/${conversacionId}/mensajes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ remitente_id, mensaje })
  });
  return res.json();
};

// ============ PARA TI ============

// GET recomendaciones
export const getParaTi = async () => {
  const res = await fetch(`${API_URL}/api/para-ti`);
  return res.json();
};

// ============ AYUDA ============

// GET ayuda
export const getAyuda = async () => {
  const res = await fetch(`${API_URL}/api/ayuda`);
  return res.json();
};

// GET preguntas frecuentes
export const getPreguntasFrecuentes = async () => {
  const res = await fetch(`${API_URL}/api/ayuda/preguntas-frecuentes`);
  return res.json();
};

// ============ COMUNIDADES ============

export const getComunidades = async () => {
  const res = await fetch(`${API_URL}/api/comunidades`);
  return res.json();
};

export const getComunidad = async (id) => {
  const res = await fetch(`${API_URL}/api/comunidades/${id}`);
  return res.json();
};


// esto aún falta por implantar ==>
export const crearComunidad = async (datos) => {
  const res = await fetch(`${API_URL}/api/comunidades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return res.json();
};

export const unirseComunidad = async (comunidadId, usuarioId) => {
  const res = await fetch(`${API_URL}/api/comunidades/${comunidadId}/unirse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: usuarioId })
  });
  return res.json();
};

// mentores ==>
  export const getMentores = async () => {
  const res = await fetch(`${API_URL}/api/mentores`);
  return res.json();
};
// editar perfil ==> subir foto
export const subirFotoPerfil = async (usuarioId, archivo) => {
  const formData = new FormData();
  formData.append("foto", archivo);

  const res = await fetch(`${API_URL}/api/usuarios/${usuarioId}/foto`, {
    method: "PUT",
    body: formData, // sin Content-Type, el navegador lo gestiona solo
  });

  if (!res.ok) throw new Error("Error al subir la foto");
  return res.json();
};

// ============ CONTACTO ============

export const enviarContacto = async (datos) => {
  const res = await fetch(`${API_URL}/api/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al enviar el mensaje');
  }

  return res.json();
};