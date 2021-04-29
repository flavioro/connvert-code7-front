import axios from './axios'
import tools from '../tools'

const clientApi = {
    async getAll() {
        return await axios.get('v1/clients', {
            security: true
        })
    },
    async getDebtsByClient(clientId, pagination) {
        return await axios.get(`v1/clients/${clientId}/debts${tools.formatParams(pagination)}`, {
            security: true
        })
    },

}
export default clientApi
