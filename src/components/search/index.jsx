import React from 'react'
import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";

export default function Search({keyword, setKeyword}) {
    return (
        <div className="flex items-center shadow-sm bg-acent border-none px-3 rounded-lg">
            <Icon
                icon="material-symbols:search-rounded"
                className="text-secondary"
                width="34"
                height="34"
            />
            <input
                type="text"
                className="w-full py-3 px-2 rounded-md outline-none"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    )
}

Search.propTypes = {
    keyword: PropTypes.string.isRequired,
    setKeyword: PropTypes.func.isRequired,
}