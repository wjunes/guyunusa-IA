/**
 * termsModal.js — Modal de Términos y Condiciones + Política de Privacidad
 */

export function openTermsModal(onAccept) {
  document.getElementById('terms-modal-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'terms-modal-overlay';
  overlay.className = 'c-terms-overlay';

  overlay.innerHTML = `
    <div class="c-terms-modal">
      <div class="c-terms-modal__header">
        <h3>Términos y Política de Privacidad</h3>
        <button class="c-terms-modal__close" id="terms-close" aria-label="Cerrar">&times;</button>
      </div>

      <div class="c-terms-modal__body" id="terms-body">

        <section class="c-terms-modal__section">
          <h2>Política de Privacidad y Seguridad de los Datos</h2>
          <p><em>Última actualización: agosto de 2026</em></p>

          <p>Esta Política de Privacidad y Seguridad de los Datos explica cómo <strong>Guyunusa IA</strong>, desarrollado por <strong>Willans Junes</strong>, recopila, utiliza, almacena y transmite información cuando el usuario utiliza la plataforma y sus funcionalidades.</p>
          <p><strong>Responsable:</strong> Willans Junes<br/><strong>Correo electrónico de contacto:</strong> wjp@algoritmos.uy<br/><strong>Sitio web:</strong> https://algoritmos.uy</p>

          <h3>1. Marco legal</h3>
          <p>El tratamiento de los datos personales realizado por Guyunusa IA se efectúa de acuerdo con la legislación aplicable en materia de protección de datos personales, incluyendo la <strong>Ley N.º 18.331 de Protección de Datos Personales y Acción de Habeas Data de la República Oriental del Uruguay</strong>, sus reglamentaciones y demás normas aplicables.</p>

          <h3>2. Información que recopilamos</h3>
          <p>Dependiendo de las funcionalidades utilizadas, Guyunusa IA puede recopilar y procesar:</p>
          <p><strong>Datos de cuenta:</strong> correo electrónico, credencial de acceso protegida mediante mecanismos de seguridad adecuados, apodo o nombre de usuario.</p>
          <p><strong>Mensajes y conversaciones:</strong> Guyunusa IA procesa el contenido de los mensajes enviados por el usuario y, cuando resulta necesario para mantener el contexto conversacional, el historial correspondiente a la conversación.</p>
          <p><strong>Datos técnicos:</strong> la plataforma puede procesar información técnica necesaria para proporcionar, mantener, proteger y diagnosticar el funcionamiento del servicio.</p>
          <p>Guyunusa IA no solicita deliberadamente información personal sensible para crear una cuenta.</p>

          <h3>3. Uso de la información</h3>
          <ul>
            <li>Crear y administrar la cuenta del usuario.</li>
            <li>Proporcionar las funcionalidades de Guyunusa IA.</li>
            <li>Procesar y responder las consultas realizadas.</li>
            <li>Mantener el contexto de las conversaciones.</li>
            <li>Proporcionar búsquedas y contenidos solicitados por el usuario.</li>
            <li>Mantener la seguridad y funcionamiento de la plataforma.</li>
            <li>Detectar y prevenir usos abusivos o no autorizados.</li>
            <li>Atender solicitudes relacionadas con la cuenta y los derechos del usuario.</li>
          </ul>

          <h3>4. Procesamiento mediante proveedores externos</h3>
          <div style="overflow-x:auto;margin:8px 0 12px;border-radius:6px;border:1px solid var(--border)">
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <thead>
                <tr style="background:var(--bg2)">
                  <th style="padding:8px 12px;text-align:left;font-weight:600;color:var(--text)">Servicio</th>
                  <th style="padding:8px 12px;text-align:left;font-weight:600;color:var(--text)">Información transmitida</th>
                  <th style="padding:8px 12px;text-align:left;font-weight:600;color:var(--text)">Finalidad</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-top:1px solid var(--border)">
                  <td style="padding:8px 12px"><strong>DeepSeek API</strong></td>
                  <td style="padding:8px 12px">Mensaje del usuario, contexto o historial necesario e instrucciones técnicas</td>
                  <td style="padding:8px 12px">Procesamiento principal y generación de respuestas mediante IA</td>
                </tr>
                <tr style="border-top:1px solid var(--border)">
                  <td style="padding:8px 12px"><strong>OpenRouter</strong></td>
                  <td style="padding:8px 12px">Mensaje del usuario, contexto o historial necesario (como respaldo)</td>
                  <td style="padding:8px 12px">Continuidad del procesamiento mediante IA</td>
                </tr>
                <tr style="border-top:1px solid var(--border)">
                  <td style="padding:8px 12px"><strong>Brave Search API</strong></td>
                  <td style="padding:8px 12px">Consulta de búsqueda optimizada</td>
                  <td style="padding:8px 12px">Recuperación de información actualizada de Internet</td>
                </tr>
                <tr style="border-top:1px solid var(--border)">
                  <td style="padding:8px 12px"><strong>YouTube Data API</strong></td>
                  <td style="padding:8px 12px">Términos de búsqueda</td>
                  <td style="padding:8px 12px">Localización de videos relacionados con la consulta</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Las consultas enviadas a los servicios de búsqueda no incluyen deliberadamente el historial completo de la conversación.</p>

          <h3>5. BNC-UY: fuente de conocimiento propia</h3>
          <p>Guyunusa IA utiliza <strong>BNC-UY (Base de Conocimiento de Uruguay)</strong> como fuente de conocimiento estructurado propia, desarrollada y administrada por Willans Junes, con <strong>79 dominios temáticos y más de 1.600 documentos</strong>. Los datos personales de los usuarios no son enviados a BNC-UY.</p>

          <h3>6. Compartición de datos</h3>
          <p>Guyunusa IA <strong>no vende, alquila ni comercializa los datos personales de sus usuarios con fines publicitarios o comerciales</strong>.</p>

          <h3>7. Almacenamiento y conservación</h3>
          <p>Los datos de la cuenta y el historial de conversaciones pueden almacenarse en la infraestructura utilizada por Guyunusa IA para proporcionar sus funcionalidades.</p>

          <h3>8. Eliminación de conversaciones y cuenta</h3>
          <p>El usuario puede solicitar la eliminación de su cuenta comunicándose con: <strong>wjp@algoritmos.uy</strong></p>

          <h3>9. Seguridad de los datos</h3>
          <ul>
            <li>Comunicaciones protegidas mediante HTTPS/TLS.</li>
            <li>Mecanismos seguros de autenticación.</li>
            <li>Protección de las credenciales mediante mecanismos de almacenamiento adecuados.</li>
            <li>Controles de acceso a los sistemas.</li>
          </ul>

          <h3>10. Información que el usuario no debería proporcionar</h3>
          <ul>
            <li>Contraseñas de otros servicios.</li>
            <li>Números completos de tarjetas bancarias.</li>
            <li>Códigos de seguridad.</li>
            <li>Documentos de identidad.</li>
            <li>Información médica sensible.</li>
            <li>Información confidencial perteneciente a terceros.</li>
          </ul>

          <h3>11. Derechos del usuario</h3>
          <p>El titular de los datos podrá ejercer los derechos de acceso, rectificación, actualización y supresión comunicándose con: <strong>Willans Junes — wjp@algoritmos.uy</strong></p>

          <h3>12. Organismo de control</h3>
          <p>En Uruguay: <strong>Unidad Reguladora y de Control de Datos Personales (URCDP)</strong>.</p>

          <h3>13. Actualización de esta política</h3>
          <p>Esta política podrá actualizarse para reflejar cambios en las funcionalidades, servicios tecnológicos o legislación aplicable.</p>
        </section>

        <hr class="c-terms-modal__divider"/>

        <section class="c-terms-modal__section">
          <h2>Términos y Condiciones de Uso</h2>
          <p><em>Última actualización: agosto de 2026</em></p>

          <p>Bienvenido a <strong>Guyunusa IA</strong>, una plataforma de inteligencia artificial desarrollada para brindar información, asistencia conversacional y acceso a contenidos de interés general, con especial atención a la identidad, cultura, historia, conocimiento y realidad de la República Oriental del Uruguay.</p>
          <p><strong>Responsable:</strong> Willans Junes — wjp@algoritmos.uy — algoritmos.uy</p>
          <p>El acceso y uso de Guyunusa IA implica la aceptación de los presentes Términos y Condiciones.</p>

          <h3>1. Naturaleza y finalidad del servicio</h3>
          <p>Guyunusa IA es una herramienta de asistencia basada en inteligencia artificial. Las respuestas tienen carácter informativo y orientativo y no sustituyen el asesoramiento de profesionales especializados.</p>

          <h3>2. Fuentes de conocimiento</h3>
          <p>Guyunusa IA utiliza BNC-UY con <strong>79 dominios temáticos y más de 1.600 documentos</strong> de referencia sobre Uruguay.</p>

          <h3>3. Inteligencia artificial y servicios externos</h3>
          <ul>
            <li><strong>DeepSeek API:</strong> procesamiento principal.</li>
            <li><strong>OpenRouter:</strong> servicio de respaldo.</li>
            <li><strong>Brave Search API:</strong> búsqueda web.</li>
            <li><strong>YouTube Data API:</strong> búsqueda de videos.</li>
          </ul>

          <h3>4. Límites y uso responsable</h3>
          <p>Queda prohibido utilizar Guyunusa IA para actividades ilícitas, vulnerar derechos de terceros, comprometer los sistemas, eludir mecanismos de seguridad o abusar de los recursos del servicio.</p>

          <h3>5. Cuenta de usuario</h3>
          <p>El usuario es responsable de mantener la confidencialidad de sus credenciales.</p>

          <h3>6. Modalidades de uso</h3>
          <p><strong>Gratuita:</strong> uso dentro de los límites establecidos. <strong>PRO:</strong> capacidades ampliadas mediante suscripción.</p>

          <h3>7. Disponibilidad del servicio</h3>
          <p>Se procura disponibilidad continua sin garantía de funcionamiento ininterrumpido.</p>

          <h3>8. Propiedad intelectual</h3>
          <p>El software, marca, identidad gráfica y contenidos originales son propiedad de <strong>Willans Junes / Algoritmos.uy</strong>.</p>

          <h3>9. Modificaciones</h3>
          <p>Estos Términos podrán actualizarse cuando sea necesario.</p>

          <h3>10. Contacto</h3>
          <p><strong>Willans Junes</strong> — wjp@algoritmos.uy — algoritmos.uy</p>
        </section>

      </div>

      <div class="c-terms-modal__footer">
        <label class="c-terms-modal__check-label" id="terms-check-label">
          <input type="checkbox" id="terms-checkbox"/>
          He leído y estoy de acuerdo con los Términos y la Política de Privacidad.
        </label>
        <button class="btn btn--primary c-terms-modal__accept" id="terms-accept-btn" disabled>
          Aceptar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Checkbox habilita el botón
  const checkbox  = document.getElementById('terms-checkbox');
  const acceptBtn = document.getElementById('terms-accept-btn');

  checkbox.addEventListener('change', () => {
    acceptBtn.disabled = !checkbox.checked;
  });

  // Aceptar
  acceptBtn.addEventListener('click', () => {
    if (!checkbox.checked) return;
    overlay.remove();
    if (typeof onAccept === 'function') onAccept();
  });

  // Cerrar
  document.getElementById('terms-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}
