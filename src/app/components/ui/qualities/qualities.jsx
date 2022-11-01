import React from 'react'
import PropTypes from 'prop-types'

const Qualities = ({ name, color }) => {
    return <div className={`${'badge rounded-pill bg-'}${color}`}>{name}</div>
}
Qualities.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Qualities
