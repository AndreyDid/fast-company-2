import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from '../../store/professions'

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus())
    const prof = useSelector(getProfessionById(id))
    if (!isLoading) {
        return <p className="text-secondary mb-1">{prof.name}</p>
    } else return 'Loading...'
}
Profession.propTypes = {
    id: PropTypes.string
}

export default Profession
