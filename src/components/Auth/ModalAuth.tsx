import { FC, useEffect } from "react"
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth"
import FormAuth from "./FormAuth"
import { useAppDispatch } from "../../hooks/redux"
import { setUser } from "../../store/reducers/user-slice"

const ModalAuth: FC = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const dispatch = useAppDispatch()

    const userLogin = (email: string, password: string) => {
        const auth = getAuth()

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                )
            })
            .catch((error: any) => {
                alert(
                    "Помилка при введенні даних або такого користувача не існує"
                )
                throw error
            })
            .then(() => {
                window.location.reload()
            })
    }

    const userSignUp = (email: string, password: string) => {
        const auth = getAuth()

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                )
            })
            .catch((error: any) => {
                alert("Помилка при введенні даних або такий користувач вже є")
                throw error
            })
            .then(() => {
                window.location.reload()
            })
    }

    return <FormAuth userLogin={userLogin} userSignUp={userSignUp} />
}

export default ModalAuth
