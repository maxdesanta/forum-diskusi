import React from 'react'
import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";

export default function Vote({iconName, count, onClick}) {
  return (
    <div className="flex gap-1.5 items-center" onClick={onClick}>
        <Icon
        icon={iconName}
        className="text-secondary cursor-pointer"
        width="32"
        height="32"
        />
        <p>{ count }</p>
    </div>
  )
}

Vote.propTypes = {
    iconName: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}