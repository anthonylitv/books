import { FC, useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import { setModalAuthShowed } from "../../store/reducers/user-slice"
import "./FormAuth.scss"

interface IFormAuthProps {
    userLogin: (email: string, password: string) => void
    userSignUp: (email: string, password: string) => void
}

const FormAuth: FC<IFormAuthProps> = ({ userLogin, userSignUp }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const overflowModal = useRef<HTMLDivElement>(null)
    const krestModal = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()
    const [methodAuth, setMethodAuth] = useState<string>("auth")

    const disableModalHandler = (event: React.MouseEvent) => {
        if (
            event.target === overflowModal.current ||
            event.target === krestModal.current
        ) {
            dispatch(setModalAuthShowed(false))
        }
    }

    const formSendHandler = (event: React.FormEvent) => {
        event.preventDefault()
    }

    const methodChangeHandler = () => {
        setEmail("")
        setPassword("")

        setMethodAuth((prevState) => {
            if (prevState === "auth") {
                return "reg"
            } else {
                return "auth"
            }
        })
    }

    return (
        <div
            onClick={disableModalHandler}
            className="modal-auth"
            ref={overflowModal}
        >
            <div className="modal-content">
                <div ref={krestModal} className="krest">
                    &#215;
                </div>

                <form onSubmit={formSendHandler}>
                    <h1 className="method-h">
                        {methodAuth === "auth" ? "Вхід" : "Реєстрація"}
                    </h1>

                    <input
                        value={email}
                        onChange={(event) => setEmail(event?.target.value)}
                        placeholder="Email"
                        type="text"
                        className="email"
                    />
                    <input
                        value={password}
                        onChange={(event) => setPassword(event?.target.value)}
                        placeholder="Пароль"
                        type="password"
                        className="email"
                    />

                    {methodAuth === "auth" ? (
                        <>
                            <button
                                onClick={() => userLogin(email, password)}
                                className="button-auth"
                            >
                                Ввійти
                            </button>
                            <span onClick={methodChangeHandler}>
                                Реєстрація
                            </span>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => userSignUp(email, password)}
                                className="button-auth"
                            >
                                Зареєструватись
                            </button>
                            <span onClick={methodChangeHandler}>Вхід</span>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default FormAuth
