import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'renderer/lib/useAppSelector';
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer || false;

const Reminder = () => {
  const router = useRouter();
  const reminderData = useAppSelector((state) => state.reminder.value);
  const nextOccurence = useAppSelector((state) => state.nextOccurence.value);
  useEffect(() => {
    if (!reminderData) {
      router.push('/home');
    }
  }, []);

  if (reminderData?.times === 0 && ipcRenderer) {
    ipcRenderer.send('close-window', 5000); // 5000 is the timeout value in ms
  }

  return (
    <div className="flex flex-col">
      {reminderData?.times > 0 ? (
        <div className="flex flex-col gap-2 px-4">
          <h1 className="text-3xl text-center">{reminderData?.title}</h1>
          <span className="text-sm">
            You will be reminded again at {nextOccurence}
          </span>
          <span className="text-sm">Reminders left: {reminderData?.times}</span>
        </div>
      ) : (
        <h1 className="text-3xl font-semibold text-center">
          No reminders left. The app will close in 5 seconds.
        </h1>
      )}
    </div>
  );
};

export default Reminder;
