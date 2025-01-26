import React from 'react';
import logo from '../../assets/logo-dulcespetalos.svg';
import { Link } from 'react-router';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const Header: React.FC = () => {
  return (
    <header className='sticky top-0 z-50 bg-white shadow-md p-4'>
      <div className='flex items-end'>
        <Link to='/'>
          <img src={logo} className='h-[28px] sm:h-[36px]' alt='Logo' />
        </Link>
        <Breadcrumb />
      </div>
    </header>
  );
};

export default Header;
