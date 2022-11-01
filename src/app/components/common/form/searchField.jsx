import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ name, value, onChange }) => {
    return (
        <div className="input-group flex-nowrap p-1">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
SearchField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SearchField
