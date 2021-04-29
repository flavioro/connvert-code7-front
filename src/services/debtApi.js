import axios from './axios'

const debtApi = {
    async saveDebt(data) {
        return await axios.post('v1/debts', data, {
            security: true
        })
    },
    async deleteDebt(id) {
        return await axios.delete(`v1/debts/${id}`, {
            security: true
        })
    },
    async updateDebt(id, data) {
        return await axios.put(`v1/debts/${id}`, data, {
            security: true
        })
    },
}
export default debtApi
