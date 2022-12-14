import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ _id, color, name }) => {
    return (
        <span className={'badge rounded-pill bg-' + color} key={_id}>
            {name}
        </span>
    )
}
Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string
}

export default Quality
