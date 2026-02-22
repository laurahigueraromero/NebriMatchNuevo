import React from 'react';
import { Link } from 'react-router-dom'; 
import '../App.css'; 
import './Footer.css';



function Footer() {
  return (
    <footer className='main-footer'>
 
      <Link to="/terminos" className="footer-link">Términos</Link>
      <Link to="/privacidad" className="footer-link">Privacidad</Link>
      <Link to="/ayuda" className="footer-link">Ayuda</Link>
      <Link to="/contacto" className="footer-link">Contacto</Link>
    </footer>
  );
}

export default Footer;