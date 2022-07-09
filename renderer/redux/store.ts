import { configureStore } from '@reduxjs/toolkit';
import reminderDataSlice from './slices/reminderDataSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      reminder: reminderDataSlice,
    },
  });
}

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
