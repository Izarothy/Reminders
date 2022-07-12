import { configureStore } from '@reduxjs/toolkit';
import sliceNext from './slices/nextReminderSlice';
import sliceReminderData from './slices/reminderDataSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      reminder: sliceReminderData,
      nextOccurence: sliceNext,
    },
  });
}

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
