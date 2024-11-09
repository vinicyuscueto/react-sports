import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AppLayout = ({ children }) => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="app-layout__main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
