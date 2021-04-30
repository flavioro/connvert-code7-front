import axios from './axios'
import tools from '../tools'

const clientService = {
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
export default clientService
