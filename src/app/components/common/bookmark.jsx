import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
    return (
        <div>
            <button {...rest}>
                <i
                    className={'bi bi-bookmark' + (status ? '-check-fill' : '')}
                ></i>
            </button>
        </div>
    )
}
BookMark.propTypes = {
    status: PropTypes.bool
}

export default BookMark
