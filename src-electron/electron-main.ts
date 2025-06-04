import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import fs from 'fs';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

const currentDir = fileURLToPath(new URL('.', import.meta.url));

let mainWindow: BrowserWindow | undefined;

const windowStateFile = path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    const state = JSON.parse(fs.readFileSync(windowStateFile, 'utf-8'));
    return {
      ...state,
      fullscreen: state.fullscreen ?? false,
    };
  } catch {
    return { width: 1000, height: 600, x: undefined, y: undefined, fullscreen: false };
  }
}

function saveWindowState(window: BrowserWindow) {
  const bounds = window.getBounds();
  const fullscreen = window.isFullScreen();
  fs.writeFileSync(windowStateFile, JSON.stringify({ ...bounds, fullscreen }));
}

async function createWindow() {
  const windowState = loadWindowState();
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    show: false,
    icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    fullscreen: windowState.fullscreen,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.maximize();
  });

  // Показать скрыть верхний навбар
  mainWindow.setMenuBarVisibility(false);

  if (process.env.DEV) {
    await mainWindow.loadURL(process.env.APP_URL);
  } else {
    await mainWindow.loadFile('index.html');
  }

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('close', () => {
    saveWindowState(mainWindow!);
  });

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

const notesFilePath = path.join(app.getPath('userData'), 'notes.json');

function loadNotesFromFile(): Array<{ id: string; title: string; description: string }> {
  try {
    if (!fs.existsSync(notesFilePath)) {
      fs.writeFileSync(notesFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(notesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveNotesToFile(notes: Array<{ id: string; title: string; description: string }>) {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

ipcMain.handle('get-notes', () => {
  return loadNotesFromFile();
});

ipcMain.handle(
  'save-notes',
  (event, notes: Array<{ id: string; title: string; description: string }>) => {
    saveNotesToFile(notes);
  },
);

void app.whenReady().then(async () => {
  try {
    await createWindow();
  } catch (error) {
    console.error('Error during window creation:', error);
  }
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    void createWindow();
  }
});
