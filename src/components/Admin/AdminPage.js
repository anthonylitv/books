import { useForm } from "react-hook-form"
import "./AdminPage.scss"
import bookApi from "../../services/bookApi"
const AdminPage = () => {
    const { data } = bookApi.useFetchBookQuery("")
    const [addBook, { isError, isSuccess }] = bookApi.useAddBookMutation()

    console.log(bookApi.useAddBookMutation())
    const zanri = data?.kategories.filter((item) => item.kategory !== "Всі")

    const books = data?.assort.slice()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: "onBlur" })

    const onSubmit = handleSubmit((data) => {
        books.push({
            id: books.length + 1,
            name: data.name,
            img: data.img,
            author: data.author,
            cost: [Number(data.cost1), Number(data.cost2)],
            zanr: data.zanr.join(","),
            anotation: data.anotation,
        })
        addBook(books).unwrap()
        // fetch(
        //     "https://books-a2888-default-rtdb.firebaseio.com/book/assort.json",
        //     {
        //         method: "PUT",
        //         body: JSON.stringify(books),
        //     }
        // )

        reset()
    })

    return (
        <div className="adminka">
            <h1>Адмін панель</h1>

            <form onSubmit={onSubmit}>
                <label>
                    Назва книги:
                    <input
                        {...register("name", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.name && <p>{errors?.name?.message}</p>}
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
                        {errors?.zanr && <p>{errors?.zanr?.message}</p>}
                    </label>
                ))}

                <label>
                    Анотація:
                    <input
                        {...register("anotation", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.anotation && <p>{errors?.anotation?.message}</p>}
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
                    {errors?.cost1 && <p>{errors?.cost1?.message}</p>}
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
                    {errors?.cost2 && <p>{errors?.cost2?.message}</p>}
                </label>

                <label>
                    Автор:
                    <input
                        {...register("author", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.author && <p>{errors?.author?.message}</p>}
                </label>

                <label>
                    Назва картинки в форматі test.jpg (картинка повинна бути
                    додана в папку img/book-items):
                    <input
                        {...register("img", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.img && <p>{errors?.img?.message}</p>}
                </label>

                <input type="submit" value="Додати книгу" />
            </form>

            {isSuccess && <h1>Книгу успішно додано</h1>}
        </div>
    )
}

export default AdminPage
