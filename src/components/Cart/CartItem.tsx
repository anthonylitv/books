import React from "react"
import "./styles/CartItem.scss"
import { FC } from "react"
import { ICartItem } from "../../models/book"
import { useAppDispatch } from "../../hooks/redux"
import cartSlice from "../../store/reducers/cart-slice"

const CartItem: FC<ICartItem> = ({
    id,
    name,
    choose,
    img,
    totalCost,
    amount,
}) => {
    const dispatch = useAppDispatch()

    const amountPlusHandler = () => {
        dispatch(cartSlice.actions.amountPlus(id))
    }

    const amountMinusHandler = () => {
        dispatch(cartSlice.actions.amountMinus(id))
    }

    const bookDeleteHandler = () => {
        dispatch(cartSlice.actions.deleteBook(id))
    }

    return (
        <div className="cart-item">
            <div className="cart-item__left-block">
                <img
                    src={`${process.env.PUBLIC_URL}/img/book-items/${img}`}
                    className="cart-item__img"
                    alt={name}
                    draggable={false}
                />

                <div className="cart-item__title">
                    <h1>{name}</h1>
                    <span>{choose}</span>
                </div>
            </div>

            <div className="cart-item__inputs">
                <button
                    onClick={amountMinusHandler}
                    className={`cart-item__input ${
                        amount === 1 ? "disabled" : ""
                    }`}
                    disabled={amount === 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>

                <span className="cart-item__count">{amount}</span>

                <button
                    onClick={amountPlusHandler}
                    className={`cart-item__input ${
                        amount === 30 ? "disabled" : ""
                    }`}
                    disabled={amount === 30}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                </button>
            </div>

            <div className="cart-item__total-cost">{totalCost} грн.</div>

            <button onClick={bookDeleteHandler} className="cart-item__delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
            </button>
        </div>
    )
}

export default React.memo(CartItem)
