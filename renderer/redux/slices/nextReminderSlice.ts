import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

interface NextReminderState {
  value: string | null;
}
const initialState: NextReminderState = {
  value: null,
};

export const nextReminderSlice = createSlice({
  name: 'nextReminder',
  initialState: initialState,
  reducers: {
    setNextOccurence: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setNextOccurence } = nextReminderSlice.actions;

export const NextReminderOccurence = (state: AppState) => {
  state.nextOccurence.value;
};

export default nextReminderSlice.reducer;
