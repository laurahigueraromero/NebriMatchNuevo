const express = require("express");
const cors = require("cors");
const { crearTablas } = require("./config/database");

const app = express();
const port = 4004;

app.use(cors());
app.use(express.json());

crearTablas();





// ========== RUTA PRINCIPAL ==========
app.get("/", (req, res) => {
  res.json({
    mensaje: "NebriMatch funcionando",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/usuarios",
      perfilUsuario: "/api/usuarios/:usuario",
      chats: "/api/usuarios/:usuario/chats",
      paraTi: "/api/para-ti",
      ayuda: "/api/ayuda",
    },
  });
});

// ========== RUTAS ============



// crear ususario ==>

  // Crear usuario
app.post("/api/usuarios", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const {
      nombre_usuario,
      email,
      password,
      descripcion,
      lenguajes_a_ensenar,
      lenguajes_a_aprender,
      rol,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO usuario (nombre_usuario, email, password, descripcion, lenguajes_a_ensenar, lenguajes_a_aprender) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre_usuario, email, password, descripcion, lenguajes_a_ensenar, lenguajes_a_aprender]
    );

    if (rol) {
      await pool.query(
        "INSERT INTO rol_usuario (usuario_id, rol) VALUES (?, ?)",
        [result.insertId, rol]
      );
    }

    res.status(201).json({
      id: result.insertId,
      nombre_usuario,
      mensaje: "Usuario creado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const [usuarios] = await pool.query("SELECT * FROM usuario");
    //Envía los datos como respuesta JSON al cliente (React)=>    res.json(usuarios);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Login de usuario
app.post("/api/login", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const { email, password } = req.body;

    const [result] = await pool.query(
      "SELECT u.*, r.rol FROM usuario u LEFT JOIN rol_usuario r ON u.id = r.usuario_id WHERE u.email = ? AND u.password = ?",
      [email, password]
    );

    if (result.length === 0) {
      return res.status(401).json({ mensaje: "Email o contraseña incorrectos" });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: result[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Perfil de usuario
app.get("/api/usuarios/:usuario", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const { usuario } = req.params;
    const [result] = await pool.query(
      "SELECT u.*, r.rol FROM usuario u LEFT JOIN rol_usuario r ON u.id = r.usuario_id WHERE u.nombre_usuario = ?",

      // ? ==>
      [usuario]
    );

    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Chats del usuario
app.get("/api/usuarios/:usuario/chats", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const { usuario } = req.params;

    // Obtener ID del usuario
    const [usuarioResult] = await pool.query(
      "SELECT id FROM usuario WHERE nombre_usuario = ?",
      [usuario]
    );

    if (usuarioResult.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioId = usuarioResult[0].id;

    // Obtener conversaciones
    const [conversaciones] = await pool.query(
      `SELECT 
        c.id,
        c.fecha_creacion,
        c.ultima_actividad,
        IF(c.usuario1_id = ?, u2.nombre_usuario, u1.nombre_usuario) as otro_usuario,
        (SELECT mensaje FROM mensajes WHERE conversacion_id = c.id ORDER BY fecha_envio DESC LIMIT 1) as ultimo_mensaje
      FROM conversaciones c
      JOIN usuario u1 ON c.usuario1_id = u1.id
      JOIN usuario u2 ON c.usuario2_id = u2.id
      WHERE c.usuario1_id = ? OR c.usuario2_id = ?
      ORDER BY c.ultima_actividad DESC`,
      [usuarioId, usuarioId, usuarioId]
    );

    res.json(conversaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Para Ti (recomendaciones)
app.get("/api/para-ti", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const [usuarios] = await pool.query(
      `SELECT * FROM usuario 
       WHERE lenguajes_a_ensenar IS NOT NULL 
       ORDER BY numero_matches DESC 
       LIMIT 20`
    );
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ayuda
app.get("/api/ayuda", (req, res) => {
  res.json({
    mensaje: "Centro de ayuda de NebriMatch",
    secciones: {
      preguntas_frecuentes: "/api/ayuda/preguntas-frecuentes",
      contacto: "/api/ayuda/contacto",
    },
  });
});

// Preguntas frecuentes
app.get("/api/ayuda/preguntas-frecuentes", (req, res) => {
  res.json({
    preguntas: [
      {
        pregunta: "¿Cómo funciona NebriMatch?",
        respuesta:
          "NebriMatch conecta personas que quieren enseñar y aprender idiomas.",
      },
      {
        pregunta: "¿Es gratis?",
        respuesta: "Sí, NebriMatch es completamente gratuito.",
      },
      {
        pregunta: "¿Cómo inicio una conversación?",
        respuesta: "Ve a 'Para Ti', encuentra un usuario y haz match.",
      },
    ],
  });
});

// PARTE DE COMUNIDADES=>
  // Obtener todas las comunidades
app.get("/api/comunidades", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const [comunidades] = await pool.query(
      `SELECT c.*, u.nombre_usuario AS creador 
       FROM comunidades c 
       JOIN usuario u ON c.creador_id = u.id 
       ORDER BY c.fecha_creacion DESC`
    );
    res.json(comunidades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear comunidad
app.post("/api/comunidades", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const { nombre, descripcion, lenguaje_asociado, creador_id } = req.body;

    const [result] = await pool.query(
      "INSERT INTO comunidades (nombre, descripcion, lenguaje_asociado, creador_id) VALUES (?, ?, ?, ?)",
      [nombre, descripcion, lenguaje_asociado, creador_id]
    );

    // El creador se une automáticamente
    await pool.query(
      "INSERT INTO comunidad_miembros (comunidad_id, usuario_id) VALUES (?, ?)",
      [result.insertId, creador_id]
    );

    res.status(201).json({ id: result.insertId, mensaje: "Comunidad creada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unirse a comunidad
app.post("/api/comunidades/:id/unirse", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const { id } = req.body;

    await pool.query(
      "INSERT INTO comunidad_miembros (comunidad_id, usuario_id) VALUES (?, ?)",
      [req.params.id, id]
    );

    res.json({ mensaje: "Te has unido a la comunidad" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Ya eres miembro" });
    }
    res.status(500).json({ error: error.message });
  }
});
// Ruta temporal para insertar comunidades de prueba
app.get("/api/seed/comunidades", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const [usuarios] = await pool.query("SELECT id FROM usuario LIMIT 1");

    if (usuarios.length === 0) {
      return res.status(400).json({ error: "No hay usuarios, crea uno primero" });
    }

    const creadorId = usuarios[0].id;

    await pool.query(
      `INSERT INTO comunidades (nombre, descripcion, lenguaje_asociado, creador_id) VALUES 
      ('Club de Programación Web', 'Aprendemos React, Node y diseño UX/UI', 'JavaScript', ?),
      ('Grupo de Python', 'Automatización y data science', 'Python', ?),
      ('Java Lovers', 'POO y patrones de diseño', 'Java', ?),
      ('React Lovers', 'Hooks, componentes y todo sobre React', 'React', ?),
      ('Node.js Backend', 'APIs REST, Express y bases de datos', 'Node.js', ?),
      ('CSS Masters', 'Flexbox, Grid y animaciones avanzadas', 'CSS', ?),
      ('SQL y Bases de Datos', 'Consultas, diseño de tablas y optimización', 'MySQL', ?)`,
      [creadorId, creadorId, creadorId, creadorId, creadorId, creadorId, creadorId]
    );

    res.json({ mensaje: "Comunidades insertadas correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// para la parte de ver detalles de las comunidades
// Obtener una comunidad por ID
app.get("/api/comunidades/:id", async (req, res) => {
  const { pool } = require("./config/database");
  try {
    const [comunidad] = await pool.query(
      `SELECT c.*, u.nombre_usuario AS creador 
       FROM comunidades c 
       JOIN usuario u ON c.creador_id = u.id 
       WHERE c.id = ?`, [req.params.id]
    );

    if (comunidad.length === 0) {
      return res.status(404).json({ mensaje: "Comunidad no encontrada" });
    }

    // Obtener miembros
    const [miembros] = await pool.query(
      `SELECT u.id, u.nombre_usuario, cm.fecha_union 
       FROM comunidad_miembros cm 
       JOIN usuario u ON cm.usuario_id = u.id 
       WHERE cm.comunidad_id = ?`, [req.params.id]
    );

    res.json({ ...comunidad[0], miembros });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== INICIAR SERVIDOR ==========
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
