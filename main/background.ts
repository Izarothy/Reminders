import { app, BrowserWindow, ipcMain } from 'electron';
import serve from 'electron-serve';
import { ReminderDataT } from 'renderer/lib/types';
import { createWindow } from './helpers';
import addTrayIcon from './helpers/add-tray-icon';
import schedule from 'node-schedule';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  addTrayIcon(mainWindow);
  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('reminder-data', (event, arg: ReminderDataT) => {
  const webContents = event.sender;
  const mainWindow = BrowserWindow.fromWebContents(webContents);

  const scheduledJob = schedule.scheduleJob(`* */${arg.interval} * *`, () => {
    event.sender.send('change-data', true);

    mainWindow.show();
    mainWindow.focus();
  });
});
