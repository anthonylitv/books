import { useForm } from "react-hook-form"
import "./AdminPage.scss"
import { useEffect } from "react"
import bookApi from "../../services/bookApi"
const AdminPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm("")

    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data))
    })
    // useEffect(() => {
    //     fetch(
    //         "https://books-a2888-default-rtdb.firebaseio.com/book/assort.json",
    //         {
    //             method: "POST",
    //             body: JSON.stringify({
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
    const { data } = bookApi.useFetchBookQuery("")

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

                <label>
                    Жанри:
                    <input
                        type="checkbox"
                        placeholder="zanr1"
                        {...register("zanr", {})}
                    />
                    <input
                        type="checkbox"
                        placeholder="zanr2"
                        {...register("zanr", {})}
                    />
                    <input
                        type="checkbox"
                        placeholder="zanr3"
                        {...register("zanr", {})}
                    />
                    <input
                        type="checkbox"
                        placeholder="zanr4"
                        {...register("zanr", {})}
                    />
                    {errors?.zanr && <p>{errors?.zanr?.message}</p>}
                </label>

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
                        {...register("cost1", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                    {errors?.cost1 && <p>{errors?.cost1?.message}</p>}
                </label>

                <label>
                    Ціна за тверду обкладинку:
                    <input
                        {...register("cost2", {
                            required: "Це поле обов'язкове для заповнення",
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

                <input type="submit" value="Додати книгу" />
            </form>
        </div>
    )
}

export default AdminPage
