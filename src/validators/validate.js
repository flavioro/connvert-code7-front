const keysName = {
    email: 'email',
    name: 'nome',
    password: 'senha',
    value:'valor',
    description:'motivo'
}

 function validate (validator, data) {
    return validator.validate(data, {abortEarly: false})
        .then((resp) => {
            return {item: resp}
        }).catch((err) => {
            const errors = {}
            err.inner.forEach((item) => {
                errors[item.params.path] = item.message.replace(':name', keysName[item.params.path])
            })
            return {errors: errors}
        })
}
export default validate
