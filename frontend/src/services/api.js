const API_URL = 'http://localhost:4004';

// para el login==>

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
  const res = await fetch(`${API_URL}/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return res.json();
};


// ============ USUARIOS ============

// GET todos los usuarios
export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/api/usuarios`);
  return res.json();
};

// GET perfil por nombre de usuario
export const getPerfil = async (nombreUsuario) => {
  const res = await fetch(`${API_URL}/api/usuarios/${nombreUsuario}`);
  return res.json();
};



// ============ CHATS ============

// GET conversaciones de un usuario
export const getChats = async (nombreUsuario) => {
  const res = await fetch(`${API_URL}/api/usuarios/${nombreUsuario}/chats`);
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

// detalles de las comunidades

export const getComunidad = async (id) => {
  const res = await fetch(`${API_URL}/api/comunidades/${id}`);
  return res.json();
};