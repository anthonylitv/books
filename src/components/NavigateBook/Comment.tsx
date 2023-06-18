import styles from "./styles/Comments.module.scss"

const Comment = () => {
    return (
        <div className={styles.comment}>
            <img src="" alt="" />
            <div className={styles.info}>
                <span className={styles.email}></span>
                <p className={styles.text}></p>
            </div>
        </div>
    )
}

export default Comment
