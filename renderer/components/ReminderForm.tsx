import React from 'react';
import { useDispatch } from 'react-redux';
import { setReminderData } from '../redux/slices/reminderDataSlice';
import { useForm } from 'react-hook-form';
import { ReminderDataT } from 'renderer/lib/types';
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer || false;

const ReminderForm = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm<ReminderDataT>();

  const setReminder = (data: ReminderDataT) => {
    // React hook form parses these as string
    data.interval = Number(data.interval);
    data.times = Number(data.times);

    dispatch(setReminderData(data));
    ipcRenderer && ipcRenderer.send('reminder-data', data);

    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(setReminder)}
        className="flex flex-col align-center gap-4"
      >
        <label>
          <h3>Reminder title</h3>
          <input
            type="text"
            {...register('title')}
            required
            className="form-input"
          />
        </label>
        <label>
          <h3>Each how many hours should the reminder go off?</h3>
          <input
            type="number"
            {...register('interval')}
            required
            className="form-input"
          />
        </label>
        <label>
          <h3>How many times should it go off?</h3>
          <input
            type="number"
            {...register('times')}
            required
            className="form-input"
          />
        </label>
        <input type="submit" value="Set the reminder" className="btn-blue" />
      </form>
    </div>
  );
};

export default ReminderForm;
