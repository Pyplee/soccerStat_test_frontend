import React from 'react';
import Header from './components/header/index';
import Footer from './components/Footer';
import Providers from './providers';
import './global.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Providers>
      <div className="layout-container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </Providers>
  );
};

export default Layout;
