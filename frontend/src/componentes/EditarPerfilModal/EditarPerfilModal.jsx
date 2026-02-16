import { useState, useEffect } from 'react';
import { editarPerfil } from '../../services/api';
import './EditarPerfilModal.css';

function EditarPerfilModal({ cerrar, usuarioId, onActualizar }) {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    descripcion: '',
    lenguajes_a_ensenar: '',
    lenguajes_a_aprender: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos actuales del usuario desde localStorage
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      setFormData({
        nombre_usuario: usuario.nombre_usuario || '',
        descripcion: usuario.descripcion || '',
        lenguajes_a_ensenar: usuario.lenguajes_a_ensenar || '',
        lenguajes_a_aprender: usuario.lenguajes_a_aprender || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Enviando datos:', formData);
      console.log('Usuario ID:', usuarioId);
      
      const resultado = await editarPerfil(usuarioId, formData);
      console.log('Respuesta del servidor:', resultado);
      
      // Actualizar localStorage con los nuevos datos
      const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
      const usuarioActualizado = { 
        ...usuarioActual,
        ...formData 
      };
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      
      // Callback para actualizar el componente padre
      if (onActualizar) {
        onActualizar(usuarioActualizado);
      }
      
      alert('Perfil actualizado correctamente');
      cerrar();
      
    } catch (err) {
      console.error('Error al actualizar:', err);
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-fondo" onClick={cerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        
        <button className="cerrar-modal" onClick={cerrar}>×</button>
        
        <header>✏️ Editar Perfil</header>
        
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            ❌ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Nombre de usuario:</td>
                <td>
                  <input 
                    type="text"
                    name="nombre_usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                    className="grande"
                    required
                    placeholder="Tu nombre de usuario"
                  />
                </td>
              </tr>
              
              <tr>
                <td>Descripción:</td>
                <td>
                  <textarea 
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="grande"
                    rows="4"
                    placeholder="Cuéntanos sobre ti, tus intereses y objetivos..."
                  />
                </td>
              </tr>
              
              <tr>
                <td>Puedo enseñar:</td>
                <td>
                  <input 
                    type="text"
                    name="lenguajes_a_ensenar"
                    value={formData.lenguajes_a_ensenar}
                    onChange={handleChange}
                    className="grande"
                    placeholder="Ej: JavaScript, Python, React"
                  />
                </td>
              </tr>
              
              <tr>
                <td>Quiero aprender:</td>
                <td>
                  <input 
                    type="text"
                    name="lenguajes_a_aprender"
                    value={formData.lenguajes_a_aprender}
                    onChange={handleChange}
                    className="grande"
                    placeholder="Ej: Node.js, Vue.js, TypeScript"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        
        <div className="boton-enviar-container">
          <button 
            type="submit" 
            className="boton-enviar"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarPerfilModal;