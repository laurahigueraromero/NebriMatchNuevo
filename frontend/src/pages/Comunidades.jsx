import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComunidades } from "../services/api";
import "../App.css";
import Header from "../componentes/Header";
import './Comunidades.css';

function Comunidades() {
  const [busqueda, setBusqueda] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
    getComunidades()
      .then(data => {
        console.log("DATOS:", data);  
        setComunidades(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const comunidadesFiltradas = comunidades.filter((grupo) => {
    const nombreGrupo = grupo.nombre ? grupo.nombre.toLowerCase() : "";
    const lenguaje = grupo.lenguaje_asociado ? grupo.lenguaje_asociado.toLowerCase() : "";
    const textoBusqueda = busqueda ? busqueda.toLowerCase() : "";

    return (
      nombreGrupo.includes(textoBusqueda) ||
      lenguaje.includes(textoBusqueda)
    );
  });

  if (loading) return <p>Cargando comunidades...</p>;

  return (
    <div className="app-comunidades">
      <nav className="navbar">
        <Header/>
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
                  <span className="tag-categoria">{grupo.lenguaje_asociado}</span>
                  <span className="num-miembros">👤 {grupo.creador}</span>
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