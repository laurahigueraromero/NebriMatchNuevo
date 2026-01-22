import { useNavigate } from "react-router-dom";

export function NotFound() {

  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Lo sentimos, dicha ruta no se encuentra en el sistema, pruebe a poner otra </p>

      <button onClick={()=> navigate("/")}>
        Volver al inicio
      </button>
    </div>
  )
}
export default NotFound;