import httpService from './http.service'
import endPoints from '../../endpoints'

const userService = {
    get: async () => {
        const { data } = await httpService.get(endPoints.userEndPoint)
        return data
    },
    create: async payload => {
        const { data } = await httpService.put(
            endPoints.userEndPoint + payload._id,
            payload
        )
        return data
    }
}
export default userService