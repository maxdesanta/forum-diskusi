import React from 'react';
import PropTypes from 'prop-types';

export default function Heading({ title }) {
  return (
    <>
      <h2 className='text-3xl font-bold text-center pb-3'>{ title }</h2>
    </>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired
};