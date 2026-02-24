import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Comunidades from "../pages/Comunidades";
import DetallesComunidades from "../pages/DetallesComunidades";
import Ayuda from "../pagesFooter/Ayuda";
import Contacto from "../pagesFooter/Contacto";
import Privacidad from "../pagesFooter/Privacidad";
import Terminos from "../pagesFooter/terminos";
import Footer from "../componentes/Footer";
import MiPerfil from "../pages/MiPerfil";
import Home from "../pages/Home";
import ParaTi from "../pages/ParaTi";
import Chats from "../pages/Chats";

// 1. Creamos un componente interno para que useLocation esté DENTRO del Router
function AppContent() {
  const location = useLocation();
  
  // Aquí definimos las rutas donde NO queremos el Footer (Home y Login)
  const ocultarFooter = ["/login", "/"].includes(location.pathname);

  return (
    <div className="app-container">
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/miPerfil" element={<MiPerfil />} />
          <Route path="/miPerfil/editarPerfil" element={<MiPerfil />} />
          <Route path="/comunidades" element={<Comunidades />} />
          <Route path="/parati" element={<ParaTi />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/comunidad/:id" element={<DetallesComunidades />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      {!ocultarFooter && <Footer />}
    </div>
  );
}


function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default AppRouter;