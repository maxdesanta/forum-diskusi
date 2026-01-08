import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

export default function ProfileWriter({ author, avatar }) {
  return (
    <div className="flex gap-2 items-center">
      {!avatar ? (
        <Icon
          icon="iconamoon:profile-circle-fill"
          className="text-secondary"
          width="32"
          height="32"
        />
      ) : (
        <img src={avatar} alt="" className='w-10 h-10 rounded-full' />
      )}
      <p>{author}</p>
    </div>
  );
}

ProfileWriter.propTypes = {
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};