import axios from './axios'

const userService = {
    async register(data) {
        return await axios.post('users/register', data)
    },
    async login(data) {
        return await axios.post('users/login', data)
    }
}
export default userService
