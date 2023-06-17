import "./styles/Header.scss"
import CartButton from "./CartButton"
import { Link, useLocation } from "react-router-dom"
import SearchInput from "./SearchInput"
import { useAuth } from "../../hooks/use-auth"
import { useAppDispatch } from "../../hooks/redux"
import { removeUser, setModalAuthShowed } from "../../store/reducers/user-slice"

const Header = () => {
    const { isAuth, email } = useAuth()
    const dispatch = useAppDispatch()

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
                    <span>КНИЖКИ</span>
                </Link>

                {pathname !== "/cart" && !pathname.includes("item") && (
                    <SearchInput />
                )}

                {pathname !== "/cart" && <CartButton />}
                {isAuth ? (
                    <div
                        onClick={() => {
                            dispatch(removeUser())
                            window.location.reload()
                        }}
                        className="exit"
                    >
                        Вийти
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            dispatch(setModalAuthShowed(true))
                        }}
                        className="exit"
                    >
                        Ввійти
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
