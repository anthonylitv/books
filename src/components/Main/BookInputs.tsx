import "./styles/BookInputs.scss"
import { FC, useState } from "react"
import ButtonAddToCart from "./ButtonAddToCart"

interface IBookInputsProps {
    id: number
    name: string
    cost: number[]
    weight: number[]
    img: string
}

const BookInputs: FC<IBookInputsProps> = ({ id, name, cost, weight, img }) => {
    const [inputValue, setInputValue] = useState<string>("30 см")

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <>
            <div className="inputs-weight">
                <div className="inputs-weight__inputs">
                    <input
                        onChange={inputChangeHandler}
                        type="radio"
                        name={`cost-${id}`}
                        id={`cost1-${id}`}
                        defaultChecked={true}
                        value="30 см"
                    />
                    <label htmlFor={`cost1-${id}`}>30 см</label>
                    <input
                        onChange={inputChangeHandler}
                        type="radio"
                        name={`cost-${id}`}
                        id={`cost2-${id}`}
                        value="40 см"
                    />
                    <label htmlFor={`cost2-${id}`}>40 см</label>
                </div>
                <div className="inputs-weight__weight">
                    <svg
                        className="inputs-weight__weight-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M288 96c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm58.5 32c3.5-10 5.5-20.8 5.5-32c0-53-43-96-96-96s-96 43-96 96c0 11.2 1.9 22 5.5 32H120c-22 0-41.2 15-46.6 36.4l-72 288c-3.6 14.3-.4 29.5 8.7 41.2S33.2 512 48 512H464c14.8 0 28.7-6.8 37.8-18.5s12.3-26.8 8.7-41.2l-72-288C433.2 143 414 128 392 128H346.5z" />
                    </svg>
                    <span className="inputs-weight__weight-span">{`Вага: ${
                        inputValue === "30 см" ? weight[0] : weight[1]
                    }г.`}</span>
                </div>
            </div>

            <div className="book-item__footer">
                <div className="book-item__cost">
                    <span>{inputValue === "30 см" ? cost[0] : cost[1]}</span>{" "}
                    грн.
                </div>
                <ButtonAddToCart
                    id={`${id}-${inputValue}`}
                    name={name}
                    choose={inputValue}
                    cost={inputValue === "30 см" ? cost[0] : cost[1]}
                    img={img}
                />
            </div>
        </>
    )
}

export default BookInputs
