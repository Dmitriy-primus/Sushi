import React from "react"
import styles from './Modal.module.css'
import ReactDom from 'react-dom'


const Backdrop = (props) => {
    return(
        <div className={styles.backdrop}>
                
        </div>
    )
}

const ModalWindow = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

const Modal = (props) => {
    return (<React.Fragment>
            {ReactDom.createPortal(<Backdrop/>, document.getElementById('overlays'))}
            {ReactDom.createPortal(<ModalWindow>{props.children}</ModalWindow>, document.getElementById('overlays'))}
        </React.Fragment>
    )
}

export default Modal