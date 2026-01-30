import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Users from "../pages/Users";
import Para_ti from "../pages/Para_ti";

import NotFound from "../pages/NotFound";
import Comunidades from "../pages/Comunidades";
import DetallesComunidades from "../pages/DetallesComunidades";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Usuario" element={<Users />} />
        <Route path="/Para_ti" element={<Para_ti />} />
        <Route path="/Comunidades" element={<Comunidades />} />
        <Route path="/comunidad/:id" element={<DetallesComunidades />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
