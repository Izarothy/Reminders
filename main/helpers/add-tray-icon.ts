import { Menu, Tray } from 'electron';
import getAssetPath from './get-asset-path';
const addTrayIcon = (
  mainWindow: Electron.CrossProcessExports.BrowserWindow
) => {
  let tray = new Tray(getAssetPath('icon.jpg'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', role: 'quit' },
  ]);

  tray.on('click', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  tray.setToolTip('Reminders');
  tray.setContextMenu(contextMenu);
};

export default addTrayIcon;
