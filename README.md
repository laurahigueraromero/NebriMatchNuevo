# 🎓 Nebrimatch - Conectando el Talento Universitario

**Nebrimatch** es una plataforma web diseñada para conectar a estudiantes universitarios mediante grupos de estudio, mentorías y comunidades académicas. El objetivo es facilitar el aprendizaje colaborativo, permitiendo a los alumnos encontrar mentores o compañeros con intereses comunes.

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)

## 🚀 Características Principales

* **Sistema de Roles:** Perfiles diferenciados para Alumnos (quieren aprender), Mentores (quieren enseñar) o Ambos.
* **Explorador de Comunidades:** Feed visual con tarjetas de grupos de estudio filtrables por categoría.
* **Buscador Inteligente:** Filtrado en tiempo real de comunidades por nombre o temática.
* **Navegación Dinámica:** Rutas protegidas y páginas de detalle para cada grupo (`/comunidades/:id`).
* **Diseño Responsive:** Interfaz adaptada a móviles, tablets y escritorio ("Mobile First").
* **Centro de Ayuda Interactivo:** Incluye un Chatbot simulado para resolver dudas frecuentes.
* **Páginas Legales:** Estructura completa de Términos, Privacidad y Contacto.

## 🛠️ Tecnologías Utilizadas

### Frontend
* ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React.js (Vite)**
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) **React Router DOM** (Navegación SPA)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3** (Diseño Flexbox y Grid personalizado)
* **Iconos:** `react-icons` (FontAwesome) y `lucide-react`.

### Backend & Base de Datos
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js + Express**
* ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat&logo=mysql&logoColor=white) **MySQL** (Base de datos relacional)





## 📂 Estructura del Proyecto

El proyecto está dividido en dos grandes bloques:

```bash
nebrimatch/
├── backend/            # Servidor API y conexión a BBDD
│   ├── config/         # Configuración de MySQL
│   ├── enrutado/       # Endpoints de la API
│   ├── server.js       # Punto de entrada del servidor
│   └── bbdd.sql        # Script de creación de la base de datos
│
└── frontend/           # Aplicación Cliente (React + Vite)
    ├── src/
    │   ├── components/ # Piezas reutilizables (Footer, Navbar...)
    │   ├── pages/      # Vistas principales (Login, Comunidades...)
    │   ├── pageFooter/ # Páginas informativas (Ayuda, Términos...)
    │   └── App.jsx     # Configuración de Rutas
    └── package.json
