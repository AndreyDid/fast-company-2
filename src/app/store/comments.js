import {createSlice, createAction} from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import {nanoid} from 'nanoid'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: state => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        commentRemove: (state, action) => {
            state.entities = state.entities.filter(
                c => c._id !== action.payload
            )
        }
    }
})

const {reducer: commentsReducer, actions} = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemove
} = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')

export const getComments = () => state => state.comments.entities
export const getCommentsLoadingStatus = () => state => state.comments.isLoading

export const loadCommentsList = userId => async dispatch => {
    dispatch(commentsRequested())
    try {
        const {content} = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}
export const removeComment = commentId => async dispatch => {
    await commentService.removeComments(commentId)
    dispatch(commentRemove(commentId))
}

export const createComments =
    ({data, userId, currentUserId}) =>
        async dispatch => {
            dispatch(commentCreateRequested())
            const comment = {
                ...data,
                _id: nanoid(),
                pageId: userId,
                created_at: Date.now(),
                userId: currentUserId
            }
            try {
                const {content} = await commentService.createComment(comment)
                dispatch(commentCreated(content))
            } catch (error) {
                dispatch(commentsRequestFailed(error.message))
            }
        }

export default commentsReducer
