import axios from './axios'

const userService = {
    async register(data) {
        return await axios.post('v1/users/create', data)
    },
    async login(data) {
        return await axios.post('v1/users/auth', data)
    }
}
export default userService
