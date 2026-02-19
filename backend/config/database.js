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
  "password VARCHAR(255) NOT NULL,"+
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





/* const insert = async () => {
  const { pool } = require("./config/database");
  try {
    await pool.query(
      "ALTER TABLE usuario ADD COLUMN password VARCHAR(255) NOT NULL AFTER email"
    );
    console.log("Columna password añadida correctamente");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

insert(); */



// hemos hecho la siguiente consulta en workbench ==>

  /*
  -- Usar tu base de datos
USE nebri_match;

-- Insertar mentores
INSERT INTO usuario (nombre_usuario, email, password, descripcion, lenguajes_a_ensenar, lenguajes_a_aprender) VALUES
('carlos_react', 'carlos@nebrimatch.com', 'password123', 'Senior Full-Stack Developer con 8 años de experiencia. Especializado en React, Node.js y arquitecturas escalables.', 'JavaScript, React, Node.js, PostgreSQL', 'GraphQL, TypeScript'),
('ana_frontend', 'ana@nebrimatch.com', 'password123', 'Frontend Developer especializada en interfaces modernas y UX/UI. Experta en CSS avanzado y frameworks.', 'HTML5, CSS3, JavaScript, Vue.js, Figma', 'React Native, Three.js'),
('david_backend', 'david@nebrimatch.com', 'password123', 'Backend Engineer con experiencia en microservicios y bases de datos. Mentor en arquitectura de software.', 'Python, Django, FastAPI, Docker, AWS', 'Kubernetes, Go'),
('maria_fullstack', 'maria@nebrimatch.com', 'password123', 'Full-Stack Developer y mentora con pasión por enseñar. Experiencia en startups y empresas tech.', 'Java, Spring Boot, Angular, MySQL', 'React, MongoDB'),
('luis_devops', 'luis@nebrimatch.com', 'password123', 'DevOps Engineer especializado en automatización y despliegues. Mentor en buenas prácticas de desarrollo.', 'Linux, Docker, Jenkins, AWS, Terraform', 'Azure, GCP'),
('sofia_mobile', 'sofia@nebrimatch.com', 'password123', 'Mobile Developer especializada en apps nativas y híbridas. Mentora en desarrollo móvil.', 'React Native, Flutter, Swift, Kotlin', 'SwiftUI, Compose'),
('miguel_ai', 'miguel@nebrimatch.com', 'password123', 'Data Scientist y ML Engineer. Especializado en inteligencia artificial y análisis de datos.', 'Python, TensorFlow, Pandas, SQL', 'PyTorch, Scala'),
('laura_ux', 'laura@nebrimatch.com', 'password123', 'UX/UI Designer con background técnico. Mentora en diseño centrado en el usuario y prototipado.', 'Figma, Adobe XD, HTML, CSS, JavaScript', 'After Effects, Principle');

-- Asignar rol de profesor a cada mentor
INSERT INTO rol_usuario (usuario_id, rol) 
SELECT id, 'profesor' FROM usuario WHERE nombre_usuario IN (
    'carlos_react', 'ana_frontend', 'david_backend', 'maria_fullstack', 
    'luis_devops', 'sofia_mobile', 'miguel_ai', 'laura_ux'
);*/ 

// ============ EXPORTAR ============
crearTablas()
module.exports = { pool, crearTablas};