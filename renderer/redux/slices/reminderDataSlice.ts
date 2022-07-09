import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { ReminderDataT } from 'renderer/lib/types';

interface ReminderDataState {
  value: ReminderDataT | null;
}
const initialState: ReminderDataState = {
  value: null,
};

export const reminderDataSlice = createSlice({
  name: 'reminder',
  initialState: initialState,
  reducers: {
    setReminderData: (state, action: PayloadAction<ReminderDataT>) => {
      state.value = action.payload;
    },
  },
});

export const { setReminderData } = reminderDataSlice.actions;

export const ReminderData = (state: AppState) => state.reminder.value;

export default reminderDataSlice.reducer;
