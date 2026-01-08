import React from 'react';
import PropTypes from 'prop-types';

export default function Hastag({ size, title = 'General' }) {
  return (
    <div className="border-secondary border-2 px-4 py-2 rounded-md">
      <p className={size}>#{title}</p>
    </div>
  );
}

Hastag.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
};