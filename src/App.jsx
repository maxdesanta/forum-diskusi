import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Router from './router/index';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './state/isPreload/action';

function App() {
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    // Jalankan pengecekan token saat aplikasi pertama kali dimuat
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // JANGAN me-render Router jika status preload masih true
  if (isPreload) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-secondary font-bold animate-pulse">Loading</p>
      </div>
    );
  }

  return (
    <>
      <Router />
    </>
  );
}

export default App;
