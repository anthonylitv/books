import { useForm } from "react-hook-form"
import "./styles/CartModal.scss"
import { useEffect, useRef } from "react"
import { setModalCartShowed } from "../../store/reducers/user-slice"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import axios from "axios"

const CartModal = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cartSlice.items)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const disableModalHandler = (event: React.MouseEvent) => {
        if (
            event.target === overflowModal.current ||
            event.target === krestModal.current
        ) {
            dispatch(setModalCartShowed(false))
        }
    }

    const overflowModal = useRef<HTMLDivElement>(null)
    const krestModal = useRef<HTMLDivElement>(null)

    console.log(
        `
`
    )
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onBlur" })

    const onSubmit = handleSubmit((data) => {
        const telegramBotToken =
            "5682756625:AAFOB6usfK4HNSyzP6fbnqo9w2oij4aziho"
        const userId = "585354756"
        const messageText = `Дані замовлення:
${data.name} ${data.lastName}
${data.dostavka}
${data.phone}
Товари:
${cartItems.map(
    (item) =>
        `Назва книги: ${item.name}, обкладинка: ${item.choose}, кількість: ${item.amount}, сума: ${item.totalCost} грн  `
).join(`
`)}
Остаточна сума замовлення: ${cartItems.reduce(
            (total, item) => item.totalCost + total,
            0
        )} грн
`

        axios
            .post(
                `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
                {
                    chat_id: userId,
                    text: messageText,
                }
            )
            .then((response: any) => {
                console.log("Сообщение отправлено в Telegram:", response.data)
            })
            .catch((error: any) => {
                console.error(
                    "Ошибка при отправке сообщения в Telegram:",
                    error
                )
            })
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    })

    return (
        <div
            className="cart-modal"
            ref={overflowModal}
            onClick={disableModalHandler}
        >
            <form onSubmit={onSubmit}>
                <div ref={krestModal} className="krest">
                    &#215;
                </div>
                <h1>Замовлення</h1>

                <label>
                    Ім'я:
                    <input
                        {...register("name", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                </label>
                {errors?.name && <p>{errors?.name?.message as any}</p>}

                <label>
                    Прізвище:
                    <input
                        {...register("lastName", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                </label>
                {errors?.lastName && <p>{errors?.lastName?.message as any}</p>}

                <label>
                    Адреса та метод доставки:
                    <input
                        {...register("dostavka", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                </label>
                {errors?.dostavka && <p>{errors?.dostavka?.message as any}</p>}

                <label>
                    Номер телефону:
                    <input
                        {...register("phone", {
                            required: "Це поле обов'язкове для заповнення",
                        })}
                    />
                </label>
                {errors?.phone && <p>{errors?.phone?.message as any}</p>}

                <input type="submit" value="Відправити" />
            </form>
        </div>
    )
}

export default CartModal
