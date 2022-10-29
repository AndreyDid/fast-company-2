import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ textInput, name, value, onchange, onclick }) => {
    return (
        <div className="input-group flex-nowrap p-1">
            <input
                ref={textInput}
                type="text"
                className="form-control"
                placeholder="Search..."
                name={name}
                value={value}
                onChange={onchange}
                onFocus={onclick}
            />
        </div>
    )
}
SearchField.propTypes = {
    textInput: PropTypes.object,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onchange: PropTypes.func,
    onclick: PropTypes.func
}

export default SearchField
