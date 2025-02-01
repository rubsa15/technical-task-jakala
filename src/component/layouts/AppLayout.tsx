import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router';
import { PlantProvider } from '../../context/plant.context';

const AppLayout: React.FC = () => {
  return (
    <PlantProvider>
      <Header />
      <div className='container mx-auto p-4 mt-4'>
        <Outlet />
      </div>
    </PlantProvider>
  );
};

export default AppLayout;
