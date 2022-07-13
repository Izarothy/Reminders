import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron';

import Store from 'electron-store';
import { WindowStateT } from 'renderer/lib/types';

export default (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = 'window-state';
  const name = `window-state-${windowName}`;
  const store = new Store({ name });

  const defaultSize = {
    width: 1000,
    height: 600,
  };

  let state: WindowStateT = {
    x: 0,
    y: 0,
    width: 1000,
    height: 600,
  };

  // eslint-disable-next-line prefer-const
  let mainWindow: Electron.CrossProcessExports.BrowserWindow;

  const restore = (): WindowStateT => ({
    width: defaultSize.width,
    height: defaultSize.height,
    x: 0,
    y: 0,
  });

  const getCurrentPosition = () => {
    const position = mainWindow.getPosition();
    const size = mainWindow.getSize();

    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (
    windowState: WindowStateT,
    bounds: WindowStateT
  ) =>
    windowState.x >= bounds.x &&
    windowState.y >= bounds.y &&
    windowState.x + windowState.width <= bounds.x + bounds.width &&
    windowState.y + windowState.height <= bounds.y + bounds.height;

  const resetToDefaults = () => {
    const { bounds } = screen.getPrimaryDisplay();
    return {
      ...defaultSize,
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    };
  };

  const ensureVisibleOnSomeDisplay = (
    windowState: WindowStateT
  ): WindowStateT => {
    const visible = screen
      .getAllDisplays()
      .some((display) => windowWithinBounds(windowState, display.bounds));
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!mainWindow.isMinimized() && !mainWindow.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  };
  mainWindow = new BrowserWindow(browserOptions);

  mainWindow.on('minimize', () => {
    mainWindow.hide();
  });

  mainWindow.on('close', saveState);

  return mainWindow;
};
