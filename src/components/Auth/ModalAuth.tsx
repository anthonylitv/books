import { useAppDispatch } from "../../hooks/redux"
import { setModalAuthShowed } from "../../store/reducers/user-slice"
import "./ModalAuth.scss"
import { FC, useEffect, useRef, useState } from "react"

const ModalAuth: FC = () => {
    const [isModalAnimated, setIsModalAnimated] = useState<boolean>(false)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        setIsModalAnimated(true)

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

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
            setIsModalAnimated(false)
            setTimeout(() => {
                dispatch(setModalAuthShowed(false))
            }, 300)
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
            className={`modal-auth ${isModalAnimated ? "anim" : ""}`}
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
                            <button className="button-auth">Ввійти</button>
                            <span onClick={methodChangeHandler}>
                                Реєстрація
                            </span>
                        </>
                    ) : (
                        <>
                            <button className="button-auth">
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

export default ModalAuth
