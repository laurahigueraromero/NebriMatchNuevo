const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "nebri_match",
});

// ============ TABLAS ============

const usuario =
  "CREATE TABLE IF NOT EXISTS usuario(" +
  "id INT NOT NULL AUTO_INCREMENT, " +
  "nombre_usuario VARCHAR(50) NOT NULL UNIQUE, " +
  "email VARCHAR(100) NOT NULL UNIQUE, " +
  "descripcion TEXT, " +
  "lenguajes_a_ensenar VARCHAR(200), " +
  "lenguajes_a_aprender VARCHAR(200), " +
  "numero_matches INT DEFAULT 0, " +
  "fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
  "PRIMARY KEY(id))";

const rol_usuario =
  "CREATE TABLE IF NOT EXISTS rol_usuario(" +
  "id INT NOT NULL AUTO_INCREMENT, " +
  "usuario_id INT NOT NULL, " +
  'rol ENUM("estudiante", "profesor") NOT NULL, ' +
  "PRIMARY KEY(id), " +
  "FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE, " +
  "UNIQUE(usuario_id))";

const conversaciones =
  "CREATE TABLE IF NOT EXISTS conversaciones(" +
  "id INT NOT NULL AUTO_INCREMENT, " +
  "usuario1_id INT NOT NULL, " +
  "usuario2_id INT NOT NULL, " +
  "fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
  "ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, " +
  "PRIMARY KEY(id), " +
  "FOREIGN KEY (usuario1_id) REFERENCES usuario(id) ON DELETE CASCADE, " +
  "FOREIGN KEY (usuario2_id) REFERENCES usuario(id) ON DELETE CASCADE, " +
  "UNIQUE KEY conversacion_unica (usuario1_id, usuario2_id))";

const mensajes =
  "CREATE TABLE IF NOT EXISTS mensajes(" +
  "id INT NOT NULL AUTO_INCREMENT, " +
  "conversacion_id INT NOT NULL, " +
  "remitente_id INT NOT NULL, " +
  "mensaje TEXT NOT NULL, " +
  "leido BOOLEAN DEFAULT FALSE, " +
  "fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
  "PRIMARY KEY(id), " +
  "FOREIGN KEY (conversacion_id) REFERENCES conversaciones(id) ON DELETE CASCADE, " +
  "FOREIGN KEY (remitente_id) REFERENCES usuario(id) ON DELETE CASCADE, " +
  "INDEX idx_conversacion (conversacion_id), " +
  "INDEX idx_fecha (fecha_envio))";

const comunidades =
  "CREATE TABLE IF NOT EXISTS comunidades(" +
  "id INT NOT NULL AUTO_INCREMENT, " +
  "nombre VARCHAR(100) NOT NULL, " +
  "descripcion TEXT, " +
  "lenguaje_asociado VARCHAR(50) NOT NULL, " +
  "creador_id INT NOT NULL, " +
  "fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
  "PRIMARY KEY(id), " +
  "FOREIGN KEY (creador_id) REFERENCES usuario(id) ON DELETE CASCADE, " +
  "INDEX idx_lenguaje (lenguaje_asociado))";

const comunidad_miembros =
  "CREATE TABLE IF NOT EXISTS comunidad_miembros(" +
  "id INT NOT NULL AUTO_INCREMENT, " +
  "comunidad_id INT NOT NULL, " +
  "usuario_id INT NOT NULL, " +
  "fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
  "PRIMARY KEY(id), " +
  "FOREIGN KEY (comunidad_id) REFERENCES comunidades(id) ON DELETE CASCADE, " +
  "FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE, " +
  "UNIQUE KEY miembro_unico (comunidad_id, usuario_id))";

// ============ ARRAY DE TABLAS ============

const tablas = [
  usuario,
  rol_usuario,
  conversaciones,
  mensajes,
  comunidades,
  comunidad_miembros
];

// ============ FUNCIÓN CREAR TABLAS ============

const crearTablas = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Creando tablas...");
    
    for (const tabla of tablas) {
      await connection.query(tabla);
    }
    
    console.log(" Todas las tablas creadas exitosamente");

    // para liberar conexiones:
    connection.release();
  } catch (error) {
    console.error(" Error al crear tablas:", error);
  }
};

// ============ EXPORTAR ============

module.exports = { pool, crearTablas };