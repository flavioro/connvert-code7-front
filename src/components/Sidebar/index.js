import logo from '../../assets/imgs/logo-white.svg'
import CardClient from '../CardClient'
import './sidebar.scss'
import React, {useState} from 'react'

function Sidebar({data, clickItem, itemActive, open}) {
    const [searchText, setSearchText] = useState('')

    const filter = item => {
        return searchText === '' ? true : item.name.toLowerCase().includes(searchText.toLowerCase())
    }

    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>
            <div className='centered'>
                <img src={logo} className='logo-home' alt='logo'/>
            </div>
            <input className='input input-search' placeholder='Pesquisar'
                   onChange={({target}) => setSearchText(target.value)}/>
            {
                (data || []).filter((item) => filter(item)).map((item, key) => {
                    return (
                        <CardClient click={() => clickItem(item)}
                                    value={item.valueTotal}
                                    key={key}
                                    active={item.id === itemActive.id}
                                    name={item.name}/>
                    )
                })
            }
        </div>
    )
}

export default Sidebar
