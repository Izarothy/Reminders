import React from 'react';
import electron, { IpcRendererEvent } from 'electron';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { decrementRemindersLeft } from 'renderer/redux/slices/reminderDataSlice';
import { setNextOccurence } from 'renderer/redux/slices/nextReminderSlice';

const ipcRenderer = electron.ipcRenderer || false;
const Confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  if (ipcRenderer) {
    ipcRenderer.on('change-data', (event: IpcRendererEvent, arg) => {
      dispatch(decrementRemindersLeft(arg.timesLeft));
      dispatch(setNextOccurence(arg.nextOccurence));
      router.push('/reminder');
    });
  }

  return (
    <div className="grid place-items-center text-3xl text-center">
      The reminder was registered. You may minimize this window.
    </div>
  );
};

export default Confirmation;
