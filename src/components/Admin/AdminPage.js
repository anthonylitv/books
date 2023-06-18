import { useForm } from "react-hook-form"
import "./AdminPage.scss"

const AdminPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm("")

    const onSubmit = handleSubmit((data) => {})
    // useEffect(() => {
    //     fetch(
    //         "https://books-a2888-default-rtdb.firebaseio.com/book/assort.json",
    //         {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 id: 20,
    //                 name: "test",
    //                 img: "test.png",
    //                 author: "test",
    //                 cost: [166, 222],
    //                 zanr: "e;;",
    //                 anotation: "rg",
    //             }),
    //         }
    //     )
    // }, [])
    return (
        <div className="adminka">
            <h1>Адмін панель</h1>

            <form onSubmit={onSubmit}></form>
        </div>
    )
}

export default AdminPage
