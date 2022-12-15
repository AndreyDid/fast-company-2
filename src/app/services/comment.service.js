import httpService from './http.service'
import endPoints from '../../endpoints'

const commentService = {
    createComment: async payload => {
        const { data } = await httpService.put(
            endPoints.commentEndPoint + payload._id,
            payload
        )
        return data
    },
    getComments: async pageId => {
        const { data } = await httpService.get(endPoints.commentEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        })
        return data
    },
    removeComments: async commentId => {
        const { data } = await httpService.delete(
            endPoints.commentEndPoint + commentId
        )
        return data
    }
}
export default commentService
