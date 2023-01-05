import httpService from './http.service'
import { professionEndPoint } from '../../endpoints'

const professionService = {
    get: async () => {
        const { data } = await httpService.get(professionEndPoint)
        return data
    }
}
export default professionService
