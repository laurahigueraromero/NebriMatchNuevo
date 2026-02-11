import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";


import NotFound from "../pages/NotFound";
import Comunidades from "../pages/Comunidades";
import DetallesComunidades from "../pages/DetallesComunidades";
import Ayuda from "./pagesFooter/Ayuda";
import Contacto from "./pagesFooter/Contacto";
import Privacidad from "./pagesFooter/Privacidad";
import Terminos from "./pagesFooter/terminos";

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content-wrap"> 
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/comunidad/:id" element={<DetallesComunidades />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
