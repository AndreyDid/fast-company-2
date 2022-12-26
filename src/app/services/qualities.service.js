import httpService from './http.service'
import {qualityEndPoint} from '../../endpoints'

const qualityService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndPoint)
        return data
    }
}
export default qualityService
