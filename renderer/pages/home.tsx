import React from 'react';
import Head from 'next/head';
import ReminderForm from '../components/ReminderForm';

function Home() {
  const setReminder = () => {};
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="grid place-items-center h-screen">
        <ReminderForm />
      </div>
    </>
  );
}

export default Home;
