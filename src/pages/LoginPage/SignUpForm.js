import React, {useState} from 'react'
import message from '../../components/Message'
import InputContent from '../../components/InputContent'
import validate from '../../validators/validate'
import userValidator from '../../validators/userValidator'
import userApi from '../../services/userApi'

export function SignUpForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async (evt) => {
        evt.preventDefault()
        setLoading(true)
        const data = await validate(userValidator, {
            name, email, password
        })
        if (data.errors) {
            message.infoErrors(data.errors)
        } else {
            await userApi.register(data.item).then(response => {
                message.info({message: 'Usuário cadastrado com sucesso.'})
                setName('')
                setEmail('')
                setPassword('')
            }).catch(error => {
                message.info({message: error.response.data.data})
            })
        }
        setLoading(false)
    }

    return (<form onSubmit={submit}>
        <InputContent label='Nome' class='mb-default'>
            <input className='input'
                   value={name}
                   minLength={1}
                   maxLength={150}
                   required={true}
                   onChange={evt => setName(evt.target.value)}/>
        </InputContent>
        <InputContent label='E-mail'
                      class='mb-default'
        >
            <input className='input'
                   type='email'
                   required={true}
                   minLength={5}
                   maxLength={200}
                   value={email}
                   onChange={evt => setEmail(evt.target.value)}
            />
        </InputContent>
        <InputContent label='Senha'
                      class='mb-default'>
            <input className='input'
                   type='password'
                   minLength={8}
                   maxLength={50}
                   required={true}
                   value={password}
                   onChange={evt => setPassword(evt.target.value)}/>
        </InputContent>
        <button className='button primary  mb-default'
                disabled={loading}
                type='submit'>
            {loading ? 'Criando...' : 'Criar Conta'}
        </button>
    </form>)
}
