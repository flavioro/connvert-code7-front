import './paginator.scss'

function Paginator({pagination, changePage}) {

    const previous = () => {
        if (pagination.page > 1) {
            changePage(pagination.page - 1)
        }
    }
    const next = () => {
        if (pagination.page < pagination.pages) {
            changePage(pagination.page + 1)
        }
    }

    return (
        <div className='content-paginator'>

            <div className={`item ${pagination.page === 1 ? 'disabled' : ''}`} onClick={() => previous()}>Anterior</div>
            <div className='item'>{pagination.page}</div>
            <div className={`item ${pagination.page >= pagination.pages ? 'disabled' : ''}`}
                 onClick={() => next()}>Próximo
            </div>
        </div>
    )
}

export default Paginator
