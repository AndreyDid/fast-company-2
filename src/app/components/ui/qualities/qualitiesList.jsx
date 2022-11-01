import React from 'react'
import Qualities from './qualities'
import PropTypes from 'prop-types'

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map(q => (
                <Qualities key={q._id} {...q} />
            ))}
        </>
    )
}
QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
