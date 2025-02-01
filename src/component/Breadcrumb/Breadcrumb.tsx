import React from 'react';
import { usePlant } from '../../hooks/usePlant';
import { useLocation } from 'react-router';

const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const { plantSelected } = usePlant();

  const paths = pathname.split('/').filter((item) => item);

  const showArrow = (index: number) => (index !== 0 ? '>' : '');

  const showName = (index: number) => {
    if (paths[index - 1] === 'product') {
      return plantSelected?.name;
    }

    return paths[index];
  };

  return (
    <div className='ml-4 flex'>
      {paths.map((_, index) => (
        <p
          className='mr-2 capitalize'
          data-test-id={`breadcrumb-${index}`}
          key={`breadcrumb-${index}`}
        >{`${showArrow(index)} ${showName(index)}`}</p>
      ))}
    </div>
  );
};

export default Breadcrumb;
