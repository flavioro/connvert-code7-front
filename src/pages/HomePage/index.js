import React, {useEffect, useState} from 'react'
import NumberFormat from 'react-number-format'

import './homePage.scss'
import clientService from '../../services/clientApi'
import messageCustom from '../../components/Message'
import tools from '../../tools'
import validate from '../../validators/validate'
import debtApi from '../../services/debtApi'
import debtValidator from '../../validators/debtValidator'
import InputContent from '../../components/InputContent'
import {TableDebt} from '../../components/TableDebt'
import Sidebar from '../../components/Sidebar'

function HomePage(props) {
    const [debts, setDebts] = useState([])
    const [clients, setClients] = useState([])
    const [client, setClient] = useState([])
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({page: 1, limit: 5, pages: 1})
    const [idUpdate, setIdUpdate] = useState(false)
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    const response = await clientService.getAll()
    setClients(response.data)
  }
  
    const clickClient = (client) => {
        setClient(client)
        getDebts(client.id)
    }

    const tableHeader = [
        {label: 'Motivo', key: 'description'},
        {label: 'Valor', key: 'value', currency: true},
        {label: 'Data', key: 'date', date: true},
        {label: 'Opcões', key: ''},
    ]

    const changePage = (page) => {
        const pag = {...pagination, page: page}
        setPagination(pag)
        getDebts(client.id, pag)
    }

    const onEdit = (item) => {
        cleanForm(item)
    }

    const onDelete = (item) => {
        messageCustom.confirm({message: 'Deseja realmente excluir esta dívida?'}).then(response => {
            if (response) {
                debtApi.deleteDebt(item._id).then(response => {
                    messageCustom.info({message: 'Dívida excluída com sucesso.'})
                    getDebts(client.id)
                    getClients()
                }).catch(error => {
                    messageCustom.info({message: 'Erro ao excluir a dívida.'})
                })
            }
        })
    }

    const getDebts = async (clientId, pag = pagination) => {
        await clientService.getDebtsByClient(clientId, pag).then(response => {
            setDebts(response.data.docs)
            delete response.data.docs
            setPagination(response.data)
        }).catch(error => {
            messageCustom.info({message: error.response.data.data})
        })
    }

    const cleanForm = (item = {}) => {
        setDate((item.date || '').slice(0, 10))
        setDescription((item.description || ''))
        setValue((item.value || 0))
        setIdUpdate((item._id || false))
    }

    const reflesh = () => {
        cleanForm()
        getDebts(client.id)
        getClients()
    }

    const create = async (data) => {
        await debtApi.saveDebt(data).then(response => {
            messageCustom.info({message: 'Dívida cadastrada com sucesso.'})
            reflesh()
        }).catch(error => {
            messageCustom.info({message: error.response.data.data})
        })
    }

    const update = async (data) => {
        await debtApi.updateDebt(idUpdate, data).then(response => {
            messageCustom.info({message: 'Dívida atualizada com sucesso.'})
            reflesh()
        }).catch(error => {
            messageCustom.info({message: error.response.data.data})
        })
    }
    
    const submit = async (evt) => {
        evt.preventDefault()
        setLoading(true)
        const data = await validate(debtValidator, {
            description: tools.getValue(description),
            value: value,
            date: tools.getValue(date),
            client_id: client.id
        })
        if (data.errors) {
            messageCustom.infoErrors(data.errors)
        } else if (idUpdate) {
            update(data.item)
        } else {
            create(data.item)
        }
        setLoading(false)
    }
    const logout = () => {
        tools.logout()
        props.history.replace('/login')
    }
  return(
		<div className='content-home'>
			<div className={`bg-sidebar  ${isOpenSidebar ? 'open' : ''}`}
				onClick={() => setIsOpenSidebar(!isOpenSidebar)}
			/>

			<Sidebar 
				data={clients}
				open={isOpenSidebar}
				itemActive={client}
				clickItem={clickClient}
			/>

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
		</div>
	)
}

export default HomePage