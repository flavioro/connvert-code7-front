import './tableDebt.scss'
import iconEdit from '../../assets/imgs/icon-edit.svg'
import iconTrash from '../../assets/imgs/icon-trash.svg'
import tools from '../../tools'
import Paginator from '../Paginator'

export function TableDebt({data, header, onDelete, onEdit, pagination, changePage}) {

    const format = (value, item) => {
        if (item.currency) {
            return `R$ ${tools.floatToCurrency(value)}`
        } else if (item.date) {
            return `${tools.dateSqlToBr(value)}`
        }
        return value
    }

    return (
        <div className='container-table-debts'>
            <table className='table'>
                <thead>
                <tr>
                    {
                        header.map((item, key) => (
                            <th key={key}>{item.label}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item, key) => (
                        <tr key={key}>
                            {
                                header.map((itemHeader, keyHeader) => (
                                    itemHeader.key ?
                                        <td data-label={itemHeader.label}
                                            key={keyHeader}>{format(item[itemHeader.key], itemHeader)}</td>
                                        : <td key={keyHeader} className='options'>

                                            <img src={iconEdit} onClick={() => onEdit(item)}
                                                 alt={`Atualizar Dívida ${item.name}`}/>
                                            <img src={iconTrash} onClick={() => onDelete(item)}
                                                 alt={`Excluir Dívida ${item.name}`}/>
                                        </td>
                                ))
                            }
                        </tr>
                    ))
                }
                {data.length === 0 ?
                    <tr>
                        <td colSpan={header.length}>
                            <div className='centered'>
                                Nenhuma informação encontrada.
                            </div>
                        </td>
                    </tr>
                    : null}
                </tbody>
            </table>
            <div className='centered'>
                <Paginator pagination={pagination}
                           changePage={changePage}/>
            </div>
        </div>
    )
}
