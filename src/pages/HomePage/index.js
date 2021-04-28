import React, {useEffect, useState} from 'react'
import clientService from '../../services/clientService'

import './homePage.scss'

function HomePage(props) {
  const [client, setClient] = useState([])
  const [clients, setClients] = useState([])

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    const response = await clientService.getAll()
    setClients(response.data)
  }

  return(
    <>
    <h1>HomePage</h1>
    </>
  )
}

export default HomePage