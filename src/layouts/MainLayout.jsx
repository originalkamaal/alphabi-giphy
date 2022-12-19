import React from 'react';
import Header from '../components/Header';

// this file is created to customize the pages other than auth for eg Home, MyFavourite etc
const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
