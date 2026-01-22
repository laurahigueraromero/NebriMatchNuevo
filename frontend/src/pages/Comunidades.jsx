import React from 'react'
import "../App.css"

function Comunidades() {
  const listaComunidades = [
    {
      id:1,
      nombre:"ARIES",
      descripcion:"Somos un grupo que Aprendemos React, Node y diseño UX/UI",
      miembros:21,
      
    },
     {
      id:2,
      nombre:"TSI",
      descripcion:"Somos un grupo que enseña Vue",
      miembros:31,
      
    },
     {
      id:3,
      nombre:"KTQM",
      descripcion:"Somos un grupo especializado en react",
      miembros:11,
      
    },
     {
      id:4,
      nombre:"DEJOITE",
      descripcion:"Somos un grupo que enseña MongoDB",
      miembros:41,
      
    },
     {
      id:5,
      nombre:"AMGDN",
      descripcion:"Somos un grupo que enseña Big Data",
      miembros:4,
      
    }
  ]

  return (
    <div className='app-comunidades'>
      <nav className="navbar">
        <div className='navbar-logo'>NEBRIMATCH</div>
        <div className='navbar-menu'>
          <span>Comunidades</span>
          <span>Mis chats</span>
          <span>Perfil</span>
        </div>
      </nav>
      <section className="principal-content">
        <h1>Tablón de comunidades</h1>
        <p>¡Bienvenido!. Aquí aparecerán los grupos de estudio y actividades.</p>
        <div className="target-groups">
          {listaComunidades.map((grupo) =>(
            <div key={grupo.id} className="card-comunidad">
              <div className="card-header">
                <span className='miembros'>{grupo.miembros}</span>
              </div>
              <h3>{grupo.nombre}</h3>
              <p>{grupo.descripcion}</p>

              <button className="btn-unirse">Ver más</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

}

export default Comunidades