import "./App.scss"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Cart from "./pages/Cart"
import Main from "./pages/Main"
import OutletRoutes from "./pages/OutletRoutes"
import { useEffect } from "react"
import NavigateBook from "./components/NavigateBook/NavigateBook"
import bookApi from "./services/bookApi"
import { useAppSelector } from "./hooks/redux"
import ModalAuth from "./components/Auth/ModalAuth"
import ReactDOM from "react-dom"
import AdminPage from "./components/Admin/AdminPage"

function App() {
    const { isError } = bookApi.useFetchBookQuery("")
    const { pathname } = useLocation()

    const isModalAuthShowed = useAppSelector(
        (state) => state.user.isModalAuthShowed
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            {isModalAuthShowed &&
                ReactDOM.createPortal(
                    <ModalAuth />,
                    document.querySelector("#root")!
                )}

            {!isError ? (
                <div className="app" id="app">
                    <Routes>
                        <Route path="/" element={<OutletRoutes />}>
                            <Route index element={<Main />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="item/:id" element={<NavigateBook />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                        <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                </div>
            ) : (
                <h1>Помилка з'єднання з сервером</h1>
            )}
        </>
    )
}

export default App
