import React from 'react';
import { Outlet } from 'react-router-dom';
import { PersonaBanner } from '../common/PersonaBanner';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <PersonaBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
