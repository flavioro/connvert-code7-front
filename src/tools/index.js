const utils = {
    httpStatus: {
        UNAUTHORIZED: 401
    },
    setToken(token) {
        localStorage.setItem('token', token)
    },
    getToken() {
        return localStorage.getItem('token')
    },
    floatToCurrency(value) {
        return parseFloat(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    },
    dateSqlToBr(date) {
        date = date.slice(0, 10).split('-')
        return `${date[2]}/${date[1]}/${date[0]}`
    },
    getValue(value) {
        if (value === '' || value === 0 || value === undefined) {
            return null
        }
        return value
    },
    logout() {
        localStorage.removeItem('token')
    },
    formatParams(params) {
        if (!params)
            return ''
        let result = '?'
        let i = 0;
        Object.keys(params).map(key => {
            if (i !== 0) {
                result += '&'
            }
            result += key + '=' + params[key]
            i++;
            return key
        })
        return result
    }
}
export default utils
