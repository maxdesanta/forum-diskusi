import React from 'react'
import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';

export default function Menu({IconName, text, url}) {
    return (
        <Link to={url}>
            <div className="flex flex-col gap-1 justify-center items-center">
                <Icon
                icon={IconName}
                className="text-acent"
                width="32"
                height="32"
                />
                <p className="text-acent font-semibold">{text}</p>
            </div>
        </Link>
    )
}

Menu.propTypes = {
    IconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}