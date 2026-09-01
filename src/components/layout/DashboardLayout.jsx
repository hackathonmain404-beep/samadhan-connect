import React from 'react';
import { Outlet } from 'react-router-dom';
import { PersonaBanner } from '../common/PersonaBanner';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';
import { Footer } from '../common/Footer';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <PersonaBanner />
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
