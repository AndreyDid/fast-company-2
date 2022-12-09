import httpService from './http.service'
import endPoints from '../../endpoints'

const professionService = {
    get: async () => {
        const { data } = await httpService.get(endPoints.professionEndPoint)
        return data
    }
}
export default professionService
