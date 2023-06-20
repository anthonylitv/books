import "./AdminPage.scss"
import bookApi from "../../services/bookApi"
import AdminAddBook from "./AdminAddBook"
import AdminDeleteBook from "./AdminDeleteBook"

const AdminPage = () => {
    const { data } = bookApi.useFetchBookQuery("")

    const books = data?.assort.slice() || []

    const zanri =
        data?.kategories.filter((item) => item.kategory !== "Всі") || []

    return (
        <>
            <div className="adminka">
                <h1 className="adminka-main-zagolovok">Адмін панель</h1>
                <div className="adminka-content">
                    <AdminAddBook zanri={zanri} books={books} />
                    <AdminDeleteBook books={books} />
                </div>
            </div>
        </>
    )
}

export default AdminPage
