import './card-client.scss'
import tools from '../../tools'

function CardClient({name, value,click,active}) {
    return (
        <div className={`card-client ${active?'active': ''}`}
             onClick={click}>
            <div className='name'>
                {name}
            </div>
            <div className='value'>
                R$ {tools.floatToCurrency(value)}
            </div>
        </div>
    )
}

export default CardClient
