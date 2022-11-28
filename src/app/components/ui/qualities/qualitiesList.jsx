import React from 'react'
import PropTypes from 'prop-types'
import Quality from '../quality'

import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities()
    if (isLoading) return 'Loading...'
    return (
        <>
            {qualities.map(qual => (
                // <p key={qual}>{qual}</p>
                <Quality key={qual} id={qual} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
