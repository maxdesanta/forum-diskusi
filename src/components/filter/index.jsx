import React from 'react'
import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";

export default function Filter({category, setCategory}) {
    return (
        <div className="relative w-50">
            <select className="w-full appearance-none bg-acent text-text font-poppins px-4 py-4 rounded-lg shadow-sm border-none focus:outline-none cursor-pointer" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value={""}>Pilih</option>
                <option value={"html"}>HTML</option>
                <option value={"redux"}>Redux</option>
                <option value={"perkenalan"}>Perkenalan</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <Icon
                icon="bxs:down-arrow"
                className="text-secondary"
                width="20"
                height="20"
                />
            </div>
        </div>
    )
}

Filter.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
}