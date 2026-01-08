import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

export default function CardLaderboards({ score, name, avatar }) {
  return (
    <div className='p-1 w-full flex items-center justify-between'>
      {/* profile group */}
      <div>
        {/* profile */}
        <div className='flex gap-5 items-center'>
          {!avatar ? (
            <Icon
              icon="iconamoon:profile-circle-fill"
              className="text-secondary"
              width="52"
              height="52"
            />
          ) : (
            <img src={avatar} alt="" className='w-16 h-16 rounded-full' />
          )}
          <p className='text-2xl'>{name}</p>
        </div>
      </div>
      {/* skor */}
      <p className='text-xl font-semibold'>{score} Pt</p>
    </div>
  );
}

CardLaderboards.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  avatar: PropTypes.string,
};