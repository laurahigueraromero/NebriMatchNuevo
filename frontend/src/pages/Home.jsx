import TarjetaHome from "../componentes/TarjetaHome";
import imagen2 from "../assets/imagenes/imagen2-home.jpg";
import FAQItem from "../componentes/FAQItem/FAQItem"; // ⚠️ Corrige la mayúscula
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // ✅ Así se usa useNavigate



  const irRegistro = () => {
    navigate('/login'); 
  };

  return (
    <div className="body-home">
      <div className="info-home">
        <div className="eslogan-home">
          <h1>Aprende mejor, acompañado</h1>
        </div>
      </div>

      <div className="Preguntas-home">
        <p className='pregunta-home'>¿QUÉ ES NEBRIMATCH?</p>
      </div>

      <div className='DistribucionTarjetas'>
        <TarjetaHome
          title="Aprende"
          text="Encuentra personas que dominen lo que estás estudiando."
        />

        <TarjetaHome
          title="Estudia en compañía"
          text="Sesiones de estudio, motivación y constancia."
        />

        <TarjetaHome
          title="Enseña"
          text="Explica temas, refuerza tu conocimiento y ayuda a otros."
        />
      </div>

      <div className="filaImagen2-home">
        <img className='imagen2-home' src={imagen2} alt="Estudiantes de NebriMatch" />

        <div className='unete-home'>
          <h3>ÚNETE A LA FAMILIA NEBRIMATCH</h3>
          <div className='botones-home'>
   
            <button onClick={irRegistro}>Registrarse o iniciar</button>
          </div>
        </div>
      </div>

      <div className="Preguntas-home">
        <p className='pregunta-home'>¿Cómo funciona?</p>
      </div>

      <div className='DistribucionTarjetas'>
        <TarjetaHome
          title="Crea tu perfil."
          text="Di qué estudias, qué sabes y qué buscas."
        />

        <TarjetaHome
          title="Haz match"
          text="Te conectamos con personas afines."
        />

        <TarjetaHome
          title="Aprended juntos"
          text="Chat, videollamada o sesiones de estudio."
        />
      </div>

      <div className="faq-home">
        <div className="Preguntas-home">
          <p className='pregunta-home'>Preguntas frecuentes</p>
        </div>

        <div className='distribuccionFAQ-home'>
          <FAQItem
            question="¿Es gratis?"
            answer="Sí. NebriMatch es completamente gratis. Puedes crear tu perfil, hacer match con otras personas y estudiar juntos sin ningún coste."
          />

          <FAQItem
            question="¿Necesito experiencia previa?"
            answer="No. Puedes usar NebriMatch tanto si estás empezando desde cero como si ya tienes conocimientos y quieres ayudar a otros. La plataforma está pensada para todos los niveles."
          />

          <FAQItem
            question="¿Cómo funciona?"
            answer="Primero creas tu perfil indicando qué estudias, qué sabes y qué quieres aprender. A partir de ahí, NebriMatch te conecta con personas compatibles para que podáis estudiar o enseñar juntos."
          />

          <FAQItem
            question="¿Cómo hago match?"
            answer="El sistema de match se basa en la información de tu perfil y tus intereses. Te proponemos a personas que tienen objetivos similares a los tuyos, y vas decidiendo con quien quieres trabajar o de quien quieres aprender"
          />

          <FAQItem
            question="¿Hay sesiones grupales?"
            answer="Sí. Puedes unirte a sesiones grupales para estudiar con varias personas al mismo tiempo y compartir conocimientos."
          />
        </div>
      </div>
    </div>
  );
}

export default Home;