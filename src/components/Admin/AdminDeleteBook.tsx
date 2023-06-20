import { FC } from "react"
import { useForm } from "react-hook-form"
import { IBookItem } from "../../models/book"
import bookApi from "../../services/bookApi"

interface IAdminDeleteBookProps {
    books: IBookItem[]
}

const AdminDeleteBook: FC<IAdminDeleteBookProps> = ({ books }) => {
    const [deleteBook, { isSuccess }] = bookApi.useDeleteBookMutation()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: "onBlur" })

    const handleSubmitHandler = handleSubmit((data) => {
        deleteBook(books.find((item) => item.name === data.del)?.id)
        console.log(books.find((item) => item.name === data.del)?.id)
        reset()
    })

    return (
        <div className="admindeletebook">
            <h2>Видалення книги</h2>
            <form onSubmit={handleSubmitHandler}>
                <p>Яку книгу бажаєте видалити: </p>
                <select
                    {...register("del", {
                        required: "Виберіть одну книгу для видалення",
                        value: false,
                    })}
                >
                    {books?.map((item) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {errors?.del && (
                    <p className="Error">{errors?.del?.message as any}</p>
                )}

                <input type="submit" value="Видалити" />
            </form>
            {isSuccess && <h1>Книгу успішно видалено</h1>}
        </div>
    )
}

export default AdminDeleteBook
