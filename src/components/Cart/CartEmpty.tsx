import CartReturnButton from "./CartReturnButton"
import "./styles/CartEmpty.scss"

const CartEmpty = () => {
    return (
        <section className="cart-empty">
            <img
                className="cart-empty__img"
                src={`${process.env.PUBLIC_URL}/img/cart-empty.svg`}
                alt="Пустий кошик"
                draggable={false}
            />

            <h1 className="cart-empty__title">Кошик пустий</h1>

            <span className="cart-empty__note">Але це можна виправити :)</span>

            <CartReturnButton />
        </section>
    )
}

export default CartEmpty
