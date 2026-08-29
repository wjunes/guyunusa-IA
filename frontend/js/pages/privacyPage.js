/**
 * privacyPage.js — Política de Privacidad, Términos de Uso y Política de Datos
 *
 * URL pública: https://guyunusa.uy/#/privacy
 * Requerido por Google Play Store — debe ser accesible sin login.
 */
import { $ } from '../utils/dom.js';

export function mount() {
  const app = $('#app');
  app.innerHTML = `
    <div class="c-privacy">
      <div class="c-privacy__header">
        <a href="#/login" class="c-privacy__logo">
          <img src="assets/images/guyunusa.png" alt="Guyunusa" width="40" height="40"/>
          <span>Guyunusa IA</span>
        </a>
        <a href="#/login" class="c-privacy__back">← Volver</a>
      </div>

      <div class="c-privacy__content">
        <h1>Política de Privacidad, Términos de Uso y Política de Datos</h1>
        <p class="c-privacy__updated">Última actualización: agosto 2026</p>

        <div id="privacy-body">
          <!-- CONTENIDO: se reemplaza con el texto real -->
          <p>Cargando políticas...</p>
        </div>
      </div>

      <div class="c-privacy__footer">
        <p>© 2026 Guyunusa IA — Algoritmos.uy — Montevideo, Uruguay</p>
        <p>Desarrollado por Willans Junes</p>
      </div>
    </div>
  `;
}
