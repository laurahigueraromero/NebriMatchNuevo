import "./TarjetaHome.css"

function TarjetaHome({title, text}) {
    return (
        <div className="TarjetaHome">
            <h3 className="TituloTarjetaHome">{title}</h3>
            <p className="TextoTarjetaHome"> {text}</p>
        </div>
    )
}

export default TarjetaHome