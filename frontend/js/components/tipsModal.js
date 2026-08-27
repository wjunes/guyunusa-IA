/**
 * tipsModal.js — Guía rápida de uso de Guyunusa
 */

export function openTipsModal() {
  document.getElementById('tips-modal-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'tips-modal-overlay';
  overlay.className = 'c-terms-overlay';

  overlay.innerHTML = `
    <div class="c-terms-modal">
      <div class="c-terms-modal__header">
        <h3>💡 Tips para aprovechar Guyunusa</h3>
        <button class="c-terms-modal__close" id="tips-close">&times;</button>
      </div>

      <div class="c-terms-modal__body">

        <h3>🆕 Nuevo chat para cada tema</h3>
        <p>Para obtener las mejores respuestas, abrí un <strong>chat nuevo</strong> cuando
        cambies de tema. Si preguntás sobre cocina y después sobre política en la misma
        conversación, Guyunusa puede mezclar información. Cada chat nuevo empieza limpio.</p>

        <h3>🎯 Sé específico en tu consulta</h3>
        <p>Cuanto más detallada sea tu pregunta, mejor será la respuesta.
        En vez de <em>"contame de Uruguay"</em>, probá
        <em>"¿cuáles fueron las principales reformas de Batlle y Ordóñez?"</em></p>

        <h3>🌐 Información actualizada</h3>
        <p>Guyunusa puede buscar información actual en la web. Preguntale sobre
        estrenos de Netflix, resultados deportivos, noticias internacionales
        o cualquier tema de actualidad.</p>

        <h3>🧉 Conocimiento uruguayo</h3>
        <p>Guyunusa cuenta con más de <strong>1.600 documentos verificados</strong> en
        <strong>70 dominios</strong>: historia, cultura, Carnaval, candombe, música,
        deportes, cine y audiovisual, gastronomía, turismo, educación, salud,
        ciencia, tecnología, energía, medio ambiente, defensa, seguridad,
        economía, comercio exterior, arquitectura, patrimonio, transporte,
        relaciones internacionales, justicia, vivienda, cooperativismo
        y muchos más. Preguntá sobre cualquier tema uruguayo.</p>

        <h3>💻 Código y tareas técnicas</h3>
        <p>Podés pedirle que escriba código, corrija errores, explique conceptos
        técnicos o te ayude con redacción. Funciona con cualquier lenguaje
        de programación.</p>

        <h3>🗣️ Voz</h3>
        <p>Usá el botón del micrófono para dictar tu consulta en vez de escribirla.
        Funciona en la app móvil y en el navegador.</p>

        <h3>🔊 Modo conversación por voz</h3>
        <p>Tocá el botón de <strong>modo voz</strong> (al lado del micrófono) para activar
        una experiencia conversacional completa: hablás, Guyunusa escucha, responde por
        escrito y <strong>te lee la respuesta en voz alta</strong>. Al terminar de hablar,
        el micrófono se reabre automáticamente para seguir la conversación sin tocar la pantalla.</p>

        <h3>📋 Compartir respuestas</h3>
        <p>Cada respuesta tiene botones para <strong>copiar</strong> y
        <strong>compartir</strong>. En el celular se abre el menú de compartir
        del sistema (WhatsApp, Telegram, etc.).</p>

        <h3>🎬 Videos</h3>
        <p>Pedile a Guyunusa que te muestre un video sobre cualquier tema.
        Por ejemplo: <em>"mostrá un video de candombe"</em> o
        <em>"video del Estadio Centenario"</em>. Los videos aparecen
        debajo de la respuesta y se abren en YouTube al tocarlos.</p>

        <h3>🖼️ Imágenes</h3>
        <p>Podés pedir fotos e imágenes sobre cualquier tema.
        Por ejemplo: <em>"foto de la Rambla de Montevideo"</em> o
        <em>"imagen del Palacio Salvo"</em>. Las imágenes aparecen
        en una grilla debajo de la respuesta.</p>

        <h3>⚡ Si la respuesta se corta</h3>
        <p>A veces las respuestas largas pueden cortarse. Guyunusa intenta
        continuar automáticamente. Si no, simplemente pedile
        <em>"seguí"</em> o <em>"continuá"</em>.</p>

        <h3>⚙️ Configuración</h3>
        <p>Desde el ícono <strong>⚙️</strong> en la parte superior podés:
        cambiar tu <strong>nombre de usuario</strong>,
        cambiar o crear tu <strong>contraseña</strong>,
        y pasarte al <strong>Plan Pro</strong> para uso ilimitado.</p>

      </div>

      <div class="c-terms-modal__footer" style="padding:10px 20px;">
        <button class="btn btn--primary" id="tips-close-btn" style="width:100%;">
          ¡Entendido!
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('tips-close')?.addEventListener('click', () => overlay.remove());
  document.getElementById('tips-close-btn')?.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}
