export default function InputContent(props){

    return (<div className={`input-content ${(props.class || '')}`} >
        <label className='label'>{props.label} <span className='optional'>{props.optional ? ' - Opcional': ''}</span></label>
        <div className='d-flex'>
            {props.children}
        </div>
    </div>);
}
