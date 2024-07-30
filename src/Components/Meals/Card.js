import styles from './Card.module.css'

const Card = (props) => {
    return (
    <div className={styles.card}>
        <div>
            {props.children}
        </div>
    </div>
    )
}

export default Card