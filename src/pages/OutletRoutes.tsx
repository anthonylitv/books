import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"

const OutletRoutes = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default OutletRoutes
