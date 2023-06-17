import { useSelector } from "react-redux"

export function useAuth() {
    const { email, token, id } = useSelector((sate) => state.user)

    return { isAuth: !!email, email, token, id }
}
