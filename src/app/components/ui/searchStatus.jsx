import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    const renderPhrase = length => {
        let phrase = ''
        if (length > 4 || length === 1) {
            phrase = `${length} человек сегодня тусанет с тобой`
        } else {
            phrase = `${length} человека тусанут с тобой сегодня`
        }
        if (length === 0) {
            phrase = 'Никто с тобой не тусанет'
        }
        return phrase
    }

    return (
        <>
            <div
                className={
                    'fs-1 m-1 badge ' +
                    (length > 0 ? 'bg-primary' : 'bg-danger')
                }
            >
                {renderPhrase(length)}
            </div>
        </>
    )
}
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}

export default SearchStatus
