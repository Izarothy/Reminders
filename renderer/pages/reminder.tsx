import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppSelector } from 'renderer/lib/useAppSelector';

const Reminder = () => {
  const router = useRouter();
  const reminderData = useAppSelector((state) => state.reminder.value);
  const nextOccurence = useAppSelector((state) => state.nextOccurence.value);
  useEffect(() => {
    if (!reminderData) {
      router.push('/home');
    }
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-center ">{reminderData?.title}</h1>
      <span>You will be reminded again at {nextOccurence}</span>
      <span>
        {reminderData?.times > 0
          ? `Reminders left: ${reminderData.times}`
          : 'No reminders left.'}
      </span>
    </div>
  );
};

export default Reminder;
