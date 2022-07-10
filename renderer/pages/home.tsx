import React from 'react';
import Head from 'next/head';
import ReminderForm from '../components/ReminderForm';
function Home() {
  return (
    <>
      <div className="grid place-items-center h-screen">
        <ReminderForm />
      </div>
    </>
  );
}

export default Home;
