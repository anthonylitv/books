import { useParams } from "react-router-dom"
import styles from "./styles/Comments.module.scss"
import bookApi from "../../services/bookApi"
import Comment from "./Comment"
import { useAuth } from "../../hooks/use-auth"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import { setModalAuthShowed } from "../../store/reducers/user-slice"

const Comments = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { data } = bookApi.useFetchBookQuery("")
    const { isAuth, email } = useAuth()
    const [textAreaText, setTextAreaText] = useState("")
    const [obnov, setObnov] = useState(false)
    const [thisComments, setThisComments] = useState<any>([])
    const [isValid, setIsValid] = useState<boolean>(true)

    useEffect(() => {
        fetch("https://books-a2888-default-rtdb.firebaseio.com/comments.json")
            .then((response) => response.json())
            .then((otvet) => {
                setThisComments(
                    Object.values(otvet).filter((item: any) => item.id == id)
                )
            })
    }, [obnov])

    const fetchCommentHandler = () => {
        if (textAreaText.length > 0 && isAuth) {
            fetch(
                "https://books-a2888-default-rtdb.firebaseio.com/comments.json",
                {
                    method: "POST",
                    body: JSON.stringify({ id, email, comment: textAreaText }),
                }
            ).then(() => {
                setTextAreaText("")
                setObnov((prev) => !prev)
            })
        } else if (textAreaText.length === 0 && isAuth) {
            setIsValid(false)
        } else {
            dispatch(setModalAuthShowed(true))
        }
    }

    return (
        <div className={styles.comments}>
            <div className={styles.block}>
                <textarea
                    value={textAreaText}
                    className={`${!isValid ? styles.not : ""}`}
                    placeholder="Залиште відгук"
                    onChange={(event) => {
                        setTextAreaText(event?.target.value)
                        setIsValid(true)
                    }}
                ></textarea>
                <button onClick={fetchCommentHandler}>Відправити</button>
            </div>

            <div className={styles.allComments}>
                {thisComments.map((item: any, index: number) => (
                    <Comment key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Comments
