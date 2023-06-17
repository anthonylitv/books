import "./styles/Cart.scss"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import cartSlice from "../store/reducers/cart-slice"
import CartContainer from "../components/Cart/CartContainer"
import CartEmpty from "../components/Cart/CartEmpty"
import CartReturnButton from "../components/Cart/CartReturnButton"
import { setModalAuthShowed } from "../store/reducers/user-slice"
import { useAuth } from "../hooks/use-auth"
import axios from "axios"

const Cart = () => {
    const { isAuth } = useAuth()

    const dispatch = useAppDispatch()

    const cartClearHandler = () => {
        dispatch(cartSlice.actions.clearCart())
    }

    const booksInCart = useAppSelector((state) => state.cartSlice.items)
    const isCartEmpty = booksInCart.length === 0

    const total = booksInCart.reduce((total, item) => total + item.totalCost, 0)

    const modalChangeHandler = () => {
        if (!isAuth) {
            dispatch(setModalAuthShowed(true))
        } else {
            const telegramBotToken =
                "5682756625:AAFOB6usfK4HNSyzP6fbnqo9w2oij4aziho"

            const userId = "585354756"

            const messageText = "Хочу Ващенко"

            axios
                .post(
                    `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
                    {
                        chat_id: userId,
                        text: messageText,
                    }
                )
                .then((response: any) => {
                    console.log(
                        "Сообщение отправлено в Telegram:",
                        response.data
                    )
                })
                .catch((error: any) => {
                    console.error(
                        "Ошибка при отправке сообщения в Telegram:",
                        error
                    )
                })
        }
    }

    return (
        <>
            {isCartEmpty ? (
                <CartEmpty />
            ) : (
                <section className="cart">
                    <div className="container">
                        <div className="cart__header">
                            <div className="cart__title">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>

                                <h1>Кошик</h1>
                            </div>

                            <button
                                onClick={cartClearHandler}
                                className="cart__clear-button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>

                                <span>Очистити кошик</span>
                            </button>
                        </div>

                        <CartContainer />

                        <div className="cart__total">
                            Сума замовлення: <span>{total} грн.</span>
                        </div>

                        <div className="cart__footer">
                            <CartReturnButton />
                            <button
                                className="cart__final"
                                onClick={modalChangeHandler}
                            >
                                Оплатити зараз
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Cart
