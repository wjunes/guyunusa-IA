/**
 * preload.js — Bridge seguro entre el proceso main y el renderer
 * Expone solo lo necesario via contextBridge (sin nodeIntegration)
 */
import { contextBridge, ipcRenderer } from 'electron';

// Marcar el documento como corriendo en Electron ANTES de que
// arranquen los scripts de la página. Esto permite que CSS y JS
// detecten el entorno sin depender del timing de contextBridge.
document.documentElement.dataset.electron = 'true';

contextBridge.exposeInMainWorld('electronAPI', {

  // Obtener si el sistema prefiere modo oscuro
  getNativeTheme: () => ipcRenderer.invoke('get-native-theme'),

  // Escuchar cambios de tema del SO
  onNativeThemeChanged: (callback) => {
    ipcRenderer.on('native-theme-changed', (_event, data) => callback(data));
  },

  // Información del entorno
  isElectron: true,
  platform:   process.platform,  // 'win32' | 'darwin' | 'linux'
});
