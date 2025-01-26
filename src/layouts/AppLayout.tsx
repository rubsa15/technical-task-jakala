import React from 'react';
import Header from '../component/Header/Header';
import { Outlet } from 'react-router';
import { ProductProvider } from '../context/product.context';

const AppLayout: React.FC = () => {
  return (
    <ProductProvider>
      <Header />
      <div className='container mx-auto p-4 mt-4'>
        <Outlet />
      </div>
    </ProductProvider>
  );
};

export default AppLayout;
