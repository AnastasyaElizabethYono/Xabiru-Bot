import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main>
        <Header />
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
