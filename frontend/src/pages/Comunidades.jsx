import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "../App.css";

function Comunidades() {
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

  const listaComunidades = [
    {
      id: 1,
      nombre: "Club de Programación Web",
      descripcion: "Aprendemos React, Node y diseño UX/UI.",
      miembros: 42,
      categoria: "Tecnología",
    },
    {
      id: 2,
      nombre: "Fútbol Sala Nebrija",
      descripcion: "Partidos los jueves por la tarde.",
      miembros: 15,
      categoria: "Deportes",
    },
    {
      id: 3,
      nombre: "Grupo de Debate",
      descripcion: "Mejora tu oratoria y pensamiento crítico.",
      miembros: 28,
      categoria: "Cultura",
    },
    {
      id: 4,
      nombre: "Ayuda Matemáticas I",
      descripcion: "Grupo de estudio para preparar el examen final.",
      miembros: 8,
      categoria: "Estudio",
    },
  ];

  const comunidadesFiltradas = listaComunidades.filter((grupo) => {
    const nombreGrupo = grupo.nombre ? grupo.nombre.toLowerCase() : "";
    const categoriaGrupo = grupo.categoria ? grupo.categoria.toLowerCase() : "";
    const textoBusqueda = busqueda ? busqueda.toLowerCase() : "";

    return (
      nombreGrupo.includes(textoBusqueda) ||
      categoriaGrupo.includes(textoBusqueda)
    );
  });

  return (
    <div className="app-comunidades">
      <nav className="navbar">
        <div className="navbar-logo">NEBRIMATCH</div>
        <div className="navbar-menu">
          <span>Comunidades</span>
          <span>Mis chats</span>
          <span>Perfil</span>
        </div>
      </nav>

      <section className="principal-content">
        <div className="header-section">
          <div>
            <h1>Tablón de comunidades</h1>
            <p>¡Bienvenido! Encuentra tu grupo ideal.</p>
          </div>

          <input
            type="text"
            placeholder="🔍 Buscar comunidad..."
            className="search-bar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="target-groups">
          {comunidadesFiltradas.length > 0 ? (
            comunidadesFiltradas.map((grupo) => (
              <div key={grupo.id} className="card-comunidad">
                <div className="card-header">
                  <span className="tag-categoria">{grupo.categoria}</span>
                  <span className="num-miembros">👥 {grupo.miembros}</span>
                </div>

                <h3>{grupo.nombre}</h3>
                <p>{grupo.descripcion}</p>

                <button
                  className="btn-unirse"
                  onClick={() => navigate(`/comunidad/${grupo.id}`)}
                >
                  Ver más
                </button>
              </div>
            ))
          ) : (
            <p>No hemos encontrado ninguna comunidad con ese nombre :(</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Comunidades;
