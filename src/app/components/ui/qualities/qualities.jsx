import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Qualities = ({ id }) => {
    const { getQuality } = useQualities()
    const { color, name } = getQuality(id)
    return <div className={`${'badge rounded-pill bg-'}${color}`}>{name}</div>
}
Qualities.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Qualities
