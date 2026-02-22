import { useState, useEffect } from 'react';
import { editarPerfil, subirFotoPerfil } from '../../services/api';
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
  const [archivoFoto, setArchivoFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // CORRECCIÓN CLAVE: Usamos sessionStorage y la clave correcta
    const usuario = JSON.parse(sessionStorage.getItem('usuario_nebrimatch'));
    
    if (usuario) {
      setFormData({
        nombre_usuario: usuario.nombre_usuario || '',
        descripcion: usuario.descripcion || '',
        lenguajes_a_ensenar: usuario.lenguajes_a_ensenar || '',
        lenguajes_a_aprender: usuario.lenguajes_a_aprender || ''
      });
      if (usuario.foto_perfil) {
        setPreview(`http://localhost:4004${usuario.foto_perfil}`);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Actualizamos datos de texto
      await editarPerfil(usuarioId, formData);

      // 2. Si hay foto nueva, la subimos y guardamos la URL que nos devuelve el back
      let rutaFotoNueva = null;
      if (archivoFoto) {
        const resFoto = await subirFotoPerfil(usuarioId, archivoFoto);
        // Asegúrate de que tu API devuelve { foto_perfil: "/uploads/..." }
        rutaFotoNueva = resFoto.foto_perfil; 
      }

      // 3. Actualizamos la sesión local con los datos nuevos para que se vea al instante
      const usuarioActual = JSON.parse(sessionStorage.getItem('usuario_nebrimatch'));
      
      const usuarioActualizado = {
        ...usuarioActual,
        ...formData,
        // Si subimos foto nueva, usamos esa. Si no, mantenemos la que ya tenía.
        foto_perfil: rutaFotoNueva || usuarioActual.foto_perfil
      };
      
      sessionStorage.setItem('usuario_nebrimatch', JSON.stringify(usuarioActualizado));

      // Avisamos al componente padre (MiPerfil) para que se repinte
      if (onActualizar) onActualizar(usuarioActualizado);

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
            background: '#f8d7da', color: '#721c24', padding: '12px',
            borderRadius: '8px', marginBottom: '20px', border: '1px solid #f5c6cb'
          }}>
            ❌ {error}
          </div>
        )}

        <div className="foto-upload-container">
          <img
            src={preview || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nombre_usuario || 'User')}&background=d71820&color=fff`}
            alt="Preview foto de perfil"
            className="preview-foto"
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          />
          
          {/* Input oculto + Label bonito */}
          <input
            id="foto-input-modal"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            style={{ display: "none" }}
          />
          <label 
            htmlFor="foto-input-modal" 
            className="btn-subir-foto"
            style={{
              marginTop: '10px',
              display: 'inline-block',
              padding: '8px 16px',
              background: '#e9ecef',
              color: '#333',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: '0.2s'
            }}
          >
            📷 Cambiar foto
          </label>
        </div>

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