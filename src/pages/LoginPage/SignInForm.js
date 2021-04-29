import React, {useState} from 'react'
import userApi from '../../services/userApi'
import tools from '../../tools'
import validate from '../../validators/validate'
import {loginValidator} from '../../validators/userValidator'
import Message from '../../components/Message'
import InputContent from '../../components/InputContent'

export function SignInForm(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    const data = await validate(loginValidator, {
         email, password
    })

    if (data.errors) {
      Message.infoErrors(data.errors)
  } else {
      await userApi.login(data.item).then(response => {
          tools.setToken(response.data.token)
          setEmail('')
          setPassword('')
          props.history.replace('/')
      }).catch(error => {
        Message.info({message: error.response.data.data})
      })
  }

    setLoading(false)
  }

  return (<form onSubmit={login}>
    <InputContent label='E-mail' class=' mb-default'>
        <input className='input'
               type='email'
               value={email}
               required={true}
               onChange={evt => setEmail(evt.target.value)}/>
    </InputContent>
    <InputContent label='Senha' class='mb-default'>
        <input className='input'
               type='password'
               minLength={8}
               value={password}
               maxLength={50}
               required={true}
               onChange={evt => setPassword(evt.target.value)}/>
    </InputContent>
    <button
        className='button primary mb-default'
        disabled={loading}
        type='submit'>
        {loading? 'Entrando...': 'Entrar'}
    </button>
  </form>)  
}