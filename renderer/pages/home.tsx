import React from 'react';
import Head from 'next/head';

function Home() {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="grid place-items-center h-screen">
        <h1>Test</h1>
      </div>
    </>
  );
}

export default Home;
