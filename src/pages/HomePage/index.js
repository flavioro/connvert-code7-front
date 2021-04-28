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

    <div className='content-form'>
            <div className=' content-white'>
                <div className='logout-toggle'>
                    <img src={'iconMenu'} alt='icon menu'
                         className='toggle-menu'
                        //  onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    />
                    <img src={'iconLogout'} alt='sair'
                         className='logout'
                        //  onClick={() => logout()}
                    />
                </div>

                <div className='row'>
                    <div className='column'>
                        <h1 className='title-page'>Dívidas</h1>
                    </div>
                </div>
                {
                    client.id ?
                        <div>
                            <form onSubmit={submit}>
                                <div className='row'>
                                    <div className='column'>
                                        <InputContent label='Motivo'>
                                            <input className='input'
                                                   minLength={1}
                                                   maxLength={200}
                                                   value={description}
                                                   onChange={({target}) => setDescription(target.value)}/>
                                        </InputContent>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='column'>
                                        <InputContent label='Valor'>
                                            <NumberFormat className='input'
                                                          decimalScale={2}
                                                          fixedDecimalScale
                                                          placeholder='$ 0,00'
                                                          prefix='R$ '
                                                          thousandSeparator='.'
                                                          decimalSeparator=','
                                                          value={value}
                                                          onValueChange={(value) => setValue(value.floatValue)}/>
                                        </InputContent>
                                    </div>
                                    <div className='column'>
                                        <InputContent label='Data'>
                                            <input type='date' className='input'
                                                   value={date}
                                                   onChange={({target}) => setDate(target.value)}/>

                                        </InputContent>
                                    </div>
                                    <div className='column btn-content-save'>
                                        <button className='button success'
                                                disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
                                        <button className='button danger'
                                                style={{marginLeft: '25px'}}
                                                onClick={cleanForm}
                                                type='button'
                                                disabled={loading}>Limpar
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className='row'>
                                <div className='column'>
                                    <TableDebt header={tableHeader}
                                               onDelete={onDelete}
                                               pagination={pagination}
                                               onEdit={onEdit}
                                               changePage={(page) => changePage(page)}
                                               data={debts}/>
                                </div>
                            </div>
                        </div> :
                        <div className='centered'>Selecione um cliente.</div>
                }
            </div>
        </div>
    </>
  )
}

export default HomePage