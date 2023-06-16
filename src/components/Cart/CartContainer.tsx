import { useAppSelector } from "../../hooks/redux"
import CartItem from "./CartItem"

const CartContainer = () => {
    const booksInCart = useAppSelector((state) => state.cartSlice.items)

    const booksInCartJSX = booksInCart.map((item) => (
        <CartItem
            key={`${item.id}-${item.choose}`}
            id={item.id}
            name={item.name}
            choose={item.choose}
            amount={item.amount}
            cost={item.cost}
            img={item.img}
            totalCost={item.totalCost}
        />
    ))

    return <div className="cart-container">{booksInCartJSX}</div>
}

export default CartContainer
