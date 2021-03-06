import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import serve from 'electron-serve';
import { ReminderDataT } from 'renderer/lib/types';
import schedule from 'node-schedule';
import { createWindow } from './helpers';

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

  let timesLeft = arg.times;
  const scheduledJob = schedule.scheduleJob(`0 */${arg.interval} * * *`, () => {
    timesLeft -= 1;
    const occurenceDate = scheduledJob.nextInvocation();
    const hours = occurenceDate.getHours().toString();
    const minutes = occurenceDate.getMinutes().toString();
    event.sender.send('change-data', {
      nextOccurence: `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`,
      timesLeft,
    });

    mainWindow.show();

    if (timesLeft === 0) scheduledJob.cancel();
  });
});

ipcMain.on('close-window', (event: IpcMainEvent, timeout: number) => {
  setTimeout(() => {
    app.exit();
  }, timeout);
});

ipcMain.on('minimize', (event: IpcMainEvent) => {
  const mainWindow: BrowserWindow = BrowserWindow.fromWebContents(event.sender);

  mainWindow.hide();
});
