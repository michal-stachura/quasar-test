import { app, BrowserWindow, nativeTheme, Menu } from 'electron';
import path from 'path';
import os from 'os';
import { menuTemplate } from './electron-main-menu-template';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

export let mainWindow: BrowserWindow | undefined;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const menu = Menu.buildFromTemplate(menuTemplate);

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    useContentSize: true,
    webPreferences: {
      // More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  Menu.setApplicationMenu(menu);
  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
