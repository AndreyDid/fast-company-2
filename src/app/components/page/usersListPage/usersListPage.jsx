import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {paginate} from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import SearchField from '../../common/form/searchField'
import {useUser} from '../../../hooks/useUsers'
import {useProfessions} from '../../../hooks/useProfession'
import _ from 'lodash'
import {useAuth} from '../../../hooks/useAuth'

const UsersListPage = () => {
    const {users} = useUser()
    const {currentUser} = useAuth()
    const {isLoading: professionsLoading, professions} = useProfessions()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
    const [searchQuery, setSearchQuery] = useState('')
    const pageSize = 8

    const handleDelete = userId => {
        // setUsers(users.filter(user => user._id !== userId))
        console.log(userId)
    }
    const handleToggleBookMark = id => {
        const newArray = users.map(user => {
            if (user._id === id) {
                return {...user, bookmark: !user.bookmark}
            }
            return user
        })
        // setUsers(newArray)
        console.log(newArray)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleProfessionSelect = item => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedProf(item)
    }

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex)
    }
    const handleSort = item => {
        setSortBy(item)
    }

    const handleSearchQuery = ({target}) => {
        setSelectedProf(undefined)
        setSearchQuery(target.value)
    }

    if (users) {
        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                    user =>
                        user.name
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) !== -1
                )
                : selectedProf
                    ? data.filter(
                        user =>
                            JSON.stringify(user.profession) ===
                            JSON.stringify(selectedProf)
                    )
                    : data
            return filteredUsers.filter(u => u._id !== currentUser._id)
        }

        const filteredUsers = filterUsers(users)
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }
        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={() => {
                                clearFilter()
                            }}
                        >
                            Очиститть
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count}/>
                    <SearchField
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'loading...'
}
UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage