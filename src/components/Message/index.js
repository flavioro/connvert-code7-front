import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './message.scss'

const MessageAlert = withReactContent(Swal)


const message = {
    getTextMessage(message) {
        const getMessages = () => {
            if (Array.isArray(message)) {
                return message
            } else if (typeof message === 'string') {
                return [message]
            }
        }
        let _return = []
        let key = 0
        for (let message of getMessages()) {
            _return.push(<div className='text-message' key={key}>{message}</div>)
            key++
        }
        return <div className='dialog-content-messages'>{_return}</div>
    },

    async message({title, message, confirm}) {
        return new Promise((resolve => {
            const close = (isOk) => {
                Swal.close()
                if (isOk) {
                    resolve(true)

                } else {
                    resolve(false)
                }
            }

            const getButtons = () => {
                if (confirm) {
                    return <div>
                        <button className='btn-ok' onClick={() => close(true)}>OK</button>
                        <button className='btn-cancel' onClick={() => close(false)}>Cancelar</button>
                    </div>
                } else {
                    return <button className='btn-ok' onClick={() => close(true)}>OK</button>
                }
            }

            MessageAlert.fire({
                html: (
                    <div className={`dialog-alert ${confirm ? ' confirm' : ''}`}>
                        <div className='header'>
                            <div className='title'>{title}</div>
                            <div className='icon-close' onClick={() => close(false)}>X</div>
                        </div>
                        <div className='body'>
                            {this.getTextMessage(message)}
                        </div>
                        <div className='footer'>
                            {getButtons()}
                        </div>
                    </div>
                ),
                showCancelButton: false,
                showConfirmButton: false
            })
        }))
    },
    info({message}) {
        return this.message({title: 'INFORMAÇÃO', message: message})
    },
    async confirm({message}) {
        return await this.message({title: 'ATENÇÃO', message: message, confirm: true})
    },
    infoErrors(params = {}) {
        return this.message({title: 'INFORMAÇÃO', message: Object.values(params)})
    }
}
export default message
