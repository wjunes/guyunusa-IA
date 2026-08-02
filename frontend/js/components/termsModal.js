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
          <h2>Términos y Condiciones de Uso de Guyunusa IA</h2>
          <p><em>Última actualización: julio de 2026</em></p>

          <p>Bienvenido a <strong>Guyunusa IA</strong>, una plataforma de inteligencia artificial desarrollada para brindar información, asistencia y acceso conversacional a contenidos de interés general, con especial atención a la identidad, cultura y conocimiento de Uruguay.</p>
          <p>El acceso y uso de Guyunusa IA implica la aceptación de los siguientes términos y condiciones.</p>

          <h3>1. Uso de la plataforma</h3>
          <p>Guyunusa IA es una herramienta de asistencia basada en inteligencia artificial. Las respuestas proporcionadas por el sistema tienen carácter <strong>informativo y orientativo</strong> y no sustituyen el criterio, conocimiento o asesoramiento de profesionales especializados.</p>
          <p>El usuario es responsable del uso que realice de la información, respuestas, contenidos o recomendaciones proporcionadas por Guyunusa IA y de las decisiones que adopte a partir de ellas.</p>
          <p><strong>Guyunusa IA no se responsabiliza por las consecuencias derivadas del uso que el usuario haga de la información obtenida mediante la plataforma.</strong></p>

          <h3>2. Límites de contenido</h3>
          <p>Guyunusa IA cuenta con mecanismos y criterios destinados a limitar determinadas consultas y contenidos que puedan resultar inapropiados, perjudiciales, ilegales o relacionados con temas que la plataforma no está diseñada para abordar.</p>
          <p>En consecuencia, Guyunusa IA podrá <strong>rechazar, limitar o redirigir determinadas solicitudes</strong>, incluso cuando el usuario las formule de manera directa o indirecta.</p>

          <h3>3. Cuenta de usuario</h3>
          <p>Para utilizar determinadas funcionalidades de Guyunusa IA, el usuario deberá crear una cuenta proporcionando únicamente los datos necesarios para su identificación dentro de la plataforma: correo electrónico, contraseña y apodo o nombre de usuario.</p>
          <p>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda actividad realizada desde su cuenta.</p>
          <p>Guyunusa IA <strong>no solicita información sensible</strong> para la creación o utilización de la cuenta.</p>

          <h3>4. Modalidades de uso</h3>
          <p>Guyunusa IA dispone de una modalidad de <strong>uso gratuito</strong>, que permite acceder a la plataforma con determinados límites diarios establecidos para garantizar un uso equilibrado del servicio.</p>
          <p>También existe una modalidad <strong>PRO</strong>, mediante una contribución mensual de bajo costo, que proporciona un acceso ampliado y un uso sin el límite diario establecido para la modalidad gratuita.</p>
          <p>Las características, límites y condiciones de cada modalidad podrán ser modificados cuando resulte necesario para garantizar la evolución, estabilidad y sostenibilidad del servicio.</p>

          <h3>5. Disponibilidad del servicio</h3>
          <p>Guyunusa IA procura mantener la plataforma disponible y funcionando correctamente. Sin embargo, el servicio puede experimentar interrupciones, mantenimiento, actualizaciones, errores técnicos o indisponibilidad temporal.</p>
          <p>No se garantiza una disponibilidad permanente e ininterrumpida del servicio.</p>

          <h3>6. Uso responsable</h3>
          <p>El usuario se compromete a utilizar Guyunusa IA de manera responsable y conforme a la legislación aplicable.</p>
          <p>No deberá utilizar la plataforma para actividades ilícitas, para vulnerar derechos de terceros, intentar comprometer la seguridad del sistema, interferir con su funcionamiento o evadir deliberadamente los mecanismos de protección y límites establecidos.</p>

          <h3>7. Propiedad y contenidos</h3>
          <p>La plataforma, su identidad, diseño, software, funcionalidades, sistemas y contenidos propios pertenecen a sus respectivos titulares y se encuentran protegidos por la normativa aplicable.</p>
          <p>Las respuestas generadas por inteligencia artificial deben ser consideradas dentro del contexto de una herramienta automatizada y pueden contener errores, omisiones o información que requiera verificación.</p>

          <h3>8. Privacidad</h3>
          <p>Guyunusa IA solicita únicamente la información necesaria para permitir el registro y funcionamiento básico de la cuenta.</p>
          <p>El usuario debe evitar introducir en sus consultas información personal sensible, datos confidenciales, contraseñas, información financiera, datos médicos u otra información que no sea necesaria para realizar su consulta.</p>

          <h3>9. Modificaciones</h3>
          <p>Guyunusa IA podrá actualizar estos Términos y Condiciones cuando resulte necesario. Las modificaciones serán publicadas en esta misma sección y entrarán en vigencia a partir de su publicación.</p>

          <h3>10. Aceptación</h3>
          <p>Al registrarse, acceder o utilizar Guyunusa IA, el usuario declara haber leído, comprendido y aceptado estos Términos y Condiciones de Uso.</p>
        </section>

        <hr class="c-terms-modal__divider"/>

        <section class="c-terms-modal__section">
          <h2>Política de Privacidad de Guyunusa IA</h2>
          <p><em>Última actualización: julio de 2026</em></p>

          <p>En Guyunusa IA consideramos la privacidad y la protección de los datos personales como un aspecto fundamental de nuestro servicio.</p>

          <h3>1. Marco legal</h3>
          <p>El tratamiento de los datos personales se efectúa de acuerdo con la legislación vigente de la República Oriental del Uruguay, especialmente con la <strong>Ley N.º 18.331 de Protección de Datos Personales y Acción de Habeas Data</strong>, su normativa reglamentaria y las disposiciones aplicables.</p>

          <h3>2. Información que se solicita</h3>
          <p>Para crear y utilizar una cuenta solamente se solicita: correo electrónico, contraseña y apodo o nombre de usuario.</p>
          <p>Guyunusa IA <strong>no solicita información sensible</strong> para crear una cuenta ni para utilizar el servicio.</p>

          <h3>3. Historial de conversaciones</h3>
          <p>Las conversaciones almacenadas permanecen asociadas a la cuenta del usuario y no son publicadas ni compartidas públicamente.</p>
          <p>Cuando el usuario elimina una conversación, dicha información es eliminada de la base de datos.</p>

          <h3>4. Eliminación de la cuenta</h3>
          <p>Cuando una cuenta es eliminada, <strong>la información asociada también es eliminada de la base de datos</strong>, de acuerdo con los procedimientos técnicos establecidos.</p>

          <h3>5. Finalidad del tratamiento</h3>
          <p>La información proporcionada es utilizada exclusivamente para: crear y administrar la cuenta, permitir el inicio de sesión, mantener el historial personal, proporcionar las funcionalidades de la plataforma y garantizar su seguridad.</p>

          <h3>6. Confidencialidad y no comercialización</h3>
          <p>La información personal de los usuarios <strong>no será vendida, cedida, publicada ni comercializada</strong>, ni será utilizada como producto comercial o para fines publicitarios no informados al usuario.</p>

          <h3>7. Requerimientos de autoridades</h3>
          <p>Guyunusa IA podrá proporcionar información cuando exista una obligación legal, requerimiento válido de una autoridad competente o resolución judicial que así lo disponga.</p>

          <h3>8. Seguridad de la información</h3>
          <p>Se adoptan medidas técnicas y organizativas destinadas a proteger la información almacenada frente a accesos no autorizados, alteración, pérdida, divulgación o uso indebido.</p>

          <h3>9. Responsabilidad del usuario</h3>
          <p>El usuario es responsable de la información que voluntariamente introduzca en sus conversaciones. Guyunusa IA recomienda no introducir información sensible que no sea necesaria para realizar una consulta.</p>

          <h3>10. Derechos del usuario</h3>
          <p>Los titulares de datos personales cuentan con derechos de acceso, rectificación, actualización y supresión, en los términos establecidos por la normativa aplicable. La <strong>Unidad Reguladora y de Control de Datos Personales (URCDP)</strong> es el organismo competente en materia de protección de datos personales en Uruguay.</p>

          <h3>11. Modificaciones</h3>
          <p>Esta Política de Privacidad podrá ser actualizada cuando resulte necesario. La versión vigente estará disponible dentro de la plataforma.</p>

          <h3>12. Aceptación</h3>
          <p>Al crear una cuenta o utilizar Guyunusa IA, el usuario declara haber leído y comprendido esta Política de Privacidad.</p>
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
