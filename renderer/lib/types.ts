export type ReminderDataT = {
  title: string;
  interval: number;
  times: number;
};

export type ChangeDataT = {
  timesLeft: number;
  nextOccurence: string;
};
