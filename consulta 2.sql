USE nebri_match;

-- 1. DESACTIVAR SEGURIDAD PARA PODER BORRAR
SET FOREIGN_KEY_CHECKS = 0;

-- 2. BORRAR TABLAS SI EXISTEN (Para empezar limpio)
DROP TABLE IF EXISTS comunidad_miembros;
DROP TABLE IF EXISTS mensajes;
DROP TABLE IF EXISTS conversaciones;
DROP TABLE IF EXISTS comunidades;
DROP TABLE IF EXISTS rol_usuario;
DROP TABLE IF EXISTS usuario;

-- 3. ACTIVAR SEGURIDAD OTRA VEZ
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- 4. CREAR TABLAS (ESTRUCTURA)
-- ==========================================

CREATE TABLE usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  descripcion TEXT,
  lenguajes_a_ensenar VARCHAR(200),
  lenguajes_a_aprender VARCHAR(200),
  numero_matches INT DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE rol_usuario (
  id INT NOT NULL AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  rol ENUM('estudiante', 'profesor') NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  UNIQUE(usuario_id)
);

CREATE TABLE comunidades (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  lenguaje_asociado VARCHAR(50) NOT NULL,
  creador_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (creador_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE comunidad_miembros (
  id INT NOT NULL AUTO_INCREMENT,
  comunidad_id INT NOT NULL,
  usuario_id INT NOT NULL,
  fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (comunidad_id) REFERENCES comunidades(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  UNIQUE KEY miembro_unico (comunidad_id, usuario_id)
);

CREATE TABLE conversaciones (
  id INT NOT NULL AUTO_INCREMENT,
  usuario1_id INT NOT NULL,
  usuario2_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (usuario1_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario2_id) REFERENCES usuario(id) ON DELETE CASCADE,
  UNIQUE KEY conversacion_unica (usuario1_id, usuario2_id)
);

CREATE TABLE mensajes (
  id INT NOT NULL AUTO_INCREMENT,
  conversacion_id INT NOT NULL,
  remitente_id INT NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY (conversacion_id) REFERENCES conversaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (remitente_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- ==========================================
-- 5. INSERTAR DATOS (EL RELLENO)
-- ==========================================

-- Usuarios (Mentores y Alumnos)
INSERT INTO usuario (nombre_usuario, email, password, descripcion, lenguajes_a_ensenar, lenguajes_a_aprender, numero_matches) VALUES
('carlos_react', 'carlos@nebrimatch.com', '1234', 'Senior Full-Stack Developer con 8 años de experiencia. Especializado en React.', 'JavaScript, React, Node.js', 'GraphQL', 15),
('ana_frontend', 'ana@nebrimatch.com', '1234', 'Frontend Developer especializada en interfaces modernas y UX/UI.', 'HTML5, CSS3, JavaScript', 'Three.js', 22),
('david_backend', 'david@nebrimatch.com', '1234', 'Backend Engineer experto en bases de datos y Python.', 'Python, Django, SQL', 'Go', 8),
('laura_ai', 'laura@nebrimatch.com', '1234', 'Ingeniera de IA y Data Science. Te explico redes neuronales fácil.', 'Python, TensorFlow, Pandas', 'Scala', 30),
('alumno_juan', 'juan@test.com', '1234', 'Estudiante entusiasta buscando aprender desarrollo web.', NULL, 'JavaScript, CSS', 0);

-- Roles
INSERT INTO rol_usuario (usuario_id, rol) VALUES 
(1, 'profesor'), 
(2, 'profesor'), 
(3, 'profesor'), 
(4, 'profesor'), 
(5, 'estudiante');

-- Comunidades
INSERT INTO comunidades (nombre, descripcion, lenguaje_asociado, creador_id) VALUES 
('React Lovers', 'Comunidad oficial para amantes de React, Hooks y componentes.', 'React', 1),
('Python Devs', 'Todo sobre Data Science, scripting y automatización con Python.', 'Python', 3),
('CSS Artistas', 'Diseño web, Grid, Flexbox y animaciones avanzadas.', 'CSS', 2),
('FullStack Club', 'Para los que tocan tanto front como back. MERN Stack.', 'JavaScript', 1);

-- Miembros de comunidades (Unimos a Carlos y Ana a varias)
INSERT INTO comunidad_miembros (comunidad_id, usuario_id) VALUES 
(1, 1), (2, 1), (3, 1), -- Carlos está en varias
(1, 2), (3, 2),         -- Ana está en React y CSS
(2, 3),                 -- David en Python
(2, 4);                 -- Laura en Python