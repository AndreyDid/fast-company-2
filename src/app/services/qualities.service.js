import httpService from './http.service'
import endPoints from '../../endpoints'

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(endPoints.qualityEndPoint)
        return data
    }
}
export default qualityService
