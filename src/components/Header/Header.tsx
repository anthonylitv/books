import "./styles/Header.scss"
import CartButton from "./CartButton"
import { Link, useLocation } from "react-router-dom"
import SearchInput from "./SearchInput"

const Header = () => {
    const { pathname } = useLocation()

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="header__logo">
                    <img
                        src={`${process.env.PUBLIC_URL}/img/logo-book.png`}
                        alt=""
                        draggable="false"
                    />
                    <span>ПІЦА</span>
                </Link>

                {pathname !== "/cart" && !pathname.includes("item") && (
                    <SearchInput />
                )}

                {pathname !== "/cart" && <CartButton />}
            </div>
        </header>
    )
}

export default Header
