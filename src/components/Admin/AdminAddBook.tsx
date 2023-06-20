import { FC } from "react"
import { useForm } from "react-hook-form"
import bookApi from "../../services/bookApi"
import { IBookItem, IBookKategory } from "../../models/book"

interface IAdminAddBookProps {
    zanri: IBookKategory[]
    books: IBookItem[]
}

const AdminAddBook: FC<IAdminAddBookProps> = ({ zanri, books }) => {
    const [addBook, { isSuccess }] = bookApi.useAddBookMutation()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: "onBlur" })

    const handleSubmitHandler = handleSubmit((data) => {
        books.push({
            id: books.length,
            name: data.name,
            img: data.img,
            author: data.author,
            cost: [Number(data.cost1), Number(data.cost2)],
            zanr: data.zanr.join(","),
            anotation: data.anotation,
        })
        addBook(books).unwrap()

        reset()
    })

    return (
        <div className="adminaddbook">
            <h2>Додавання книги</h2>
            <form onSubmit={handleSubmitHandler}>
                <label>
                    Назва книги:
                    <input
                        {...register("name", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.name && <p>{errors?.name?.message as any}</p>}
                </label>

                <span>Жанри:</span>

                {zanri?.map((item) => (
                    <label key={item.id}>
                        <p>{item.kategory}</p>

                        <input
                            value={item.kategory}
                            type="checkbox"
                            {...register("zanr", {
                                required: "Виберіть хоча б одне",
                            })}
                        />
                        {errors?.zanr && <p>{errors?.zanr?.message as any}</p>}
                    </label>
                ))}

                <label>
                    Анотація:
                    <input
                        {...register("anotation", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.anotation && (
                        <p>{errors?.anotation?.message as any}</p>
                    )}
                </label>

                <label>
                    Ціна за м'яку обкладинку:
                    <input
                        type="number"
                        {...register("cost1", {
                            required: "Це поле обов'язкове для заповнення",
                            min: { message: "Мінімальне значення 1", value: 1 },
                        })}
                    />
                    {errors?.cost1 && <p>{errors?.cost1?.message as any}</p>}
                </label>

                <label>
                    Ціна за тверду обкладинку:
                    <input
                        type="number"
                        {...register("cost2", {
                            required: "Це поле обов'язкове для заповнення",
                            min: { message: "Мінімальне значення 1", value: 1 },
                        })}
                    />
                    {errors?.cost2 && <p>{errors?.cost2?.message as any}</p>}
                </label>

                <label>
                    Автор:
                    <input
                        {...register("author", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.author && <p>{errors?.author?.message as any}</p>}
                </label>

                <label>
                    Назва картинки в форматі test.jpg (картинка повинна бути
                    додана в папку img/book-items):
                    <input
                        {...register("img", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.img && <p>{errors?.img?.message as any}</p>}
                </label>

                <input type="submit" value="Додати книгу" />
            </form>
            {isSuccess && <h1>Книгу успішно додано</h1>}
        </div>
    )
}

export default AdminAddBook
