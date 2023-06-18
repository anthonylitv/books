import { useParams } from "react-router-dom"
import styles from "./styles/Comments.module.scss"
import bookApi from "../../services/bookApi"
import Comment from "./Comment"
import { useAuth } from "../../hooks/use-auth"
import { useEffect, useState } from "react"

const Comments = () => {
    const { id } = useParams()

    const { data } = bookApi.useFetchBookQuery("")
    const { isAuth, email } = useAuth()
    const [textAreaText, setTextAreaText] = useState("")
    const [obnov, setObnov] = useState(false)
    const [thisComments, setThisComments] = useState<any>([])

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
        fetch("https://books-a2888-default-rtdb.firebaseio.com/comments.json", {
            method: "POST",
            body: JSON.stringify({ id, email, comment: textAreaText }),
        }).then(() => setObnov((prev) => !prev))
    }

    return (
        <div className={styles.comments}>
            <textarea
                placeholder="Залиште відгук"
                onChange={(event) => setTextAreaText(event?.target.value)}
            ></textarea>
            <button onClick={fetchCommentHandler}>Відправити</button>

            <div className={styles.allComments}>
                {thisComments.map((item: any, index: number) => (
                    <Comment key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Comments
