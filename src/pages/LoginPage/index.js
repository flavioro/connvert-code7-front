import React, {useState} from 'react'

import {SignInForm} from './SignInForm'
import {SignUpForm} from './SignUpForm'
import tools from '../../tools'
import logo from '../../assets/imgs/logo.svg'
import './LoginPage.scss'

export function LoginPage(props) {
  const [isSingIn, setSignIn] = useState(true)
  const label = isSingIn ? 'Criar Conta' : 'Login'
  const token = tools.getToken()
  if(token  !== '' && token != null){
      props.history.push('/')
  }

  return (<div className='container-login'>
      <div className='form-login-container shadow'>
          <div className='content-form'>
              <div className='centered'>
                  <img src={logo}
                       className='mb-default logo-login'
                       alt='Logo'/>
              </div>
              {isSingIn ? <SignInForm history={props.history}/> : <SignUpForm history={props.history}/>}
              <div onClick={() => setSignIn(!isSingIn)}
                   className='link success text-center '>
                  {label}
              </div>
          </div>

      </div>
  </div>);
}