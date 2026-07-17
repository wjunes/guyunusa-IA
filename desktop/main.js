/**
 * main.js — Proceso principal de Electron (Guyunusa Desktop)
 * Carga la app web en producción: https://guyunusa.uy
 */
import {
  app,
  BrowserWindow,
  Menu,
  shell,
  nativeTheme,
  ipcMain,
  clipboard,
  session,
} from 'electron';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const APP_URL    = 'https://guyunusa.uy';
const APP_ICON   = join(__dirname, 'assets', 'icons', 'guyunusa.ico');
const isDev      = process.argv.includes('--dev');

let mainWindow;

// ── Ventana principal ─────────────────────────────────────────────────────────

async function createWindow() {
  mainWindow = new BrowserWindow({
    width:     1366,
    height:    820,
    minWidth:  1024,
    minHeight: 640,
    title:     'Guyunusa',
    icon:      APP_ICON,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#1a1814' : '#faf9f6',
    show: false,
    webPreferences: {
      preload:          join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration:  false,
      sandbox:          true,
    },
    autoHideMenuBar: false,
  });

  // Permisos: micrófono y cámara (necesarios para funciones de voz)
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    const allowed = ['media', 'audioCapture', 'microphone'];
    callback(allowed.includes(permission));
  });

  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    const allowed = ['media', 'audioCapture', 'microphone'];
    return allowed.includes(permission);
  });

  await mainWindow.loadURL(`${APP_URL}?electron=1`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  });

  // Abrir links externos en el navegador del sistema, no en Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('context-menu', (_event, params) => {
    createContextMenu(mainWindow, params);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ── Menú contextual ───────────────────────────────────────────────────────────

function createContextMenu(win, params) {
  const hasSelection = Boolean(params.selectionText?.trim());
  const isEditable   = Boolean(params.isEditable);

  const template = [
    ...(isEditable
      ? [
        { label: 'Deshacer',         role: 'undo' },
        { label: 'Rehacer',          role: 'redo' },
        { type: 'separator' },
        { label: 'Cortar',           role: 'cut' },
        { label: 'Copiar',           role: 'copy', enabled: hasSelection },
        { label: 'Pegar',            role: 'paste' },
        { type: 'separator' },
        { label: 'Seleccionar todo', role: 'selectAll' },
      ]
      : [
        { label: 'Copiar',   role: 'copy', enabled: hasSelection },
        { type: 'separator' },
        { label: 'Recargar', role: 'reload' },
      ]),
    ...(params.linkURL
      ? [
        { type: 'separator' },
        { label: 'Abrir enlace en navegador', click: () => shell.openExternal(params.linkURL) },
        { label: 'Copiar enlace',             click: () => clipboard.writeText(params.linkURL) },
      ]
      : []),
    ...(isDev
      ? [{ type: 'separator' }, { label: 'Inspeccionar', role: 'inspectElement' }]
      : []),
  ];

  Menu.buildFromTemplate(template).popup({ window: win });
}

// ── Menú de aplicación ────────────────────────────────────────────────────────

function buildMenu() {
  const template = [
    {
      label: 'Guyunusa',
      submenu: [
        { label: 'Acerca de Guyunusa', role: 'about' },
        { type: 'separator' },
        { label: 'Salir', role: 'quit', accelerator: 'CmdOrCtrl+Q' },
      ],
    },
    {
      label: 'Editar',
      submenu: [
        { label: 'Deshacer',         role: 'undo',      accelerator: 'CmdOrCtrl+Z' },
        { label: 'Rehacer',          role: 'redo',      accelerator: 'CmdOrCtrl+Shift+Z' },
        { type: 'separator' },
        { label: 'Cortar',           role: 'cut',       accelerator: 'CmdOrCtrl+X' },
        { label: 'Copiar',           role: 'copy',      accelerator: 'CmdOrCtrl+C' },
        { label: 'Pegar',            role: 'paste',     accelerator: 'CmdOrCtrl+V' },
        { label: 'Seleccionar todo', role: 'selectAll', accelerator: 'CmdOrCtrl+A' },
      ],
    },
    {
      label: 'Ver',
      submenu: [
        { label: 'Recargar',          role: 'reload',           accelerator: 'CmdOrCtrl+R' },
        { type: 'separator' },
        { label: 'Acercar',           role: 'zoomIn',           accelerator: 'CmdOrCtrl+=' },
        { label: 'Alejar',            role: 'zoomOut',          accelerator: 'CmdOrCtrl+-' },
        { label: 'Tamaño real',       role: 'resetZoom',        accelerator: 'CmdOrCtrl+0' },
        { type: 'separator' },
        { label: 'Pantalla completa', role: 'togglefullscreen', accelerator: 'F11' },
        ...(isDev
          ? [{ type: 'separator' }, { label: 'Herramientas de desarrollador', role: 'toggleDevTools' }]
          : []),
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ── IPC — Tema nativo ─────────────────────────────────────────────────────────

ipcMain.handle('get-native-theme', () => ({
  shouldUseDarkColors: nativeTheme.shouldUseDarkColors,
}));

nativeTheme.on('updated', () => {
  mainWindow?.webContents.send('native-theme-changed', {
    shouldUseDarkColors: nativeTheme.shouldUseDarkColors,
  });
});

// ── Ciclo de vida ─────────────────────────────────────────────────────────────

app.whenReady().then(async () => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('uy.guyunusa.desktop');
  }

  buildMenu();
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) await createWindow();
  });
}).catch((err) => {
  console.error('[App] Error en arranque:', err);
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
