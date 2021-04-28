import axios from 'axios'
import utils from '../tools'
import history from '../routers/history';

const baseApi = axios.create({
    baseURL: process.env.REACT_APP_URL_API
})

baseApi.interceptors.request.use((config) => {
    const token = utils.getToken()
    if (!token && config.security) {
        history.push('/login')
    } else if (config.security) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
baseApi.interceptors.response.use((response) => {
    return response
}, (error) => {

    if (error.response === undefined || utils.httpStatus.UNAUTHORIZED === error.response.status) {
        utils.logout()
        history.push('/login')
        return ''
    }
    return Promise.reject(error)
})
export default baseApi
