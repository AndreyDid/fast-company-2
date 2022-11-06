import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import QualitiesList from '../../ui/qualities/qualitiesList'
import { useHistory } from 'react-router-dom'

const UserPage = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data))
    }, [])

    const handleClick = () => {
        history.push(`/users/${user._id}/edit`)
    }

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h3>Rate: {user.rate}</h3>
                <button role="button" onClick={handleClick}>
                    Изменить
                </button>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
