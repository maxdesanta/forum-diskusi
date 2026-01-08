import React from 'react';
import Header from '../../components/header';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <Header />
      <main className="p-5 flex justify-center">
        <div className='w-[90%] flex justify-between flex-col gap-8'>
          <Outlet />
        </div>
      </main>
    </>
  );
}
