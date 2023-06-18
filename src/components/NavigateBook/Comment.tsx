import { FC } from "react"
import styles from "./styles/Comments.module.scss"

interface CommentProps {
    email: string
    comment: string
}

const Comment: FC<CommentProps> = (props) => {
    return (
        <div className={styles.comment}>
            <img
                src={`${process.env.PUBLIC_URL}/img/comment-logo.png`}
                alt="Картинка"
            />
            <div className={styles.info}>
                <span className={styles.email}>{props.email}</span>
                <p className={styles.text}>{props.comment}</p>
            </div>
        </div>
    )
}

export default Comment
