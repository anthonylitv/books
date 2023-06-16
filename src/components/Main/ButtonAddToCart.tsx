import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { CartItemProps } from "../../models/book"
import cartSlice from "../../store/reducers/cart-slice"
import "./styles/ButtonAddToCart.scss"

const ButtonAddToCart: FC<CartItemProps> = ({
    id,
    name,
    choose,
    cost,
    img,
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const items = useAppSelector((state) => state.cartSlice.items)

    const isInCart = items.find(
        (item) => item.id === id && item.choose === choose
    )

    const buttonAddHandler = () => {
        if (isInCart) {
            navigate("/cart")
        } else {
            dispatch(
                cartSlice.actions.addBookToCart({
                    id,
                    name,
                    choose,
                    cost,
                    amount: 1,
                    totalCost: cost,
                    img,
                })
            )
        }
    }

    return (
        <div
            className={`add-to-cart ${isInCart ? "added" : ""}`}
            onClick={buttonAddHandler}
        >
            {isInCart ? "В кошику" : "В кошик"}
            {!isInCart && (
                <>
                    <span className="add-to-cart__line add-to-cart__line--top"></span>
                    <span className="add-to-cart__line add-to-cart__line--right"></span>
                    <span className="add-to-cart__line add-to-cart__line--bottom"></span>
                    <span className="add-to-cart__line add-to-cart__line--left"></span>
                </>
            )}
        </div>
    )
}

export default ButtonAddToCart
