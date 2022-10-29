import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
    return (
        <div>
            <button {...rest}>
                <i
                    className={
                        status ? 'bi bi-bookmark-check-fill' : 'bi bi-bookmark'
                    }
                ></i>
            </button>
        </div>
    )
}
BookMark.propTypes = {
    status: PropTypes.bool.isRequired
}

export default BookMark
