import "./InteresPerfil.css"
import persona1 from "../../assets/imagenes/Captura.JPG";


function InteresPerfil({ nombre, info }) {
    return (
        <div className="Perfiles-interesantes">

            <div className="imagen-interesPerfil">
                <img src={persona1} alt="" />
            </div>

            <div className="detalles-interesPerfil">
                <p>{nombre}</p>
                <p>{info}</p>
            </div>
        </div>
    )
}

export default InteresPerfil