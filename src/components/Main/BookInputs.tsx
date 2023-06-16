import "./styles/BookInputs.scss"
import { FC, useState } from "react"
import ButtonAddToCart from "./ButtonAddToCart"

interface IBookInputsProps {
    id: number
    name: string
    cost: number[]
    img: string
}

const BookInputs: FC<IBookInputsProps> = ({ id, name, cost, img }) => {
    const [inputValue, setInputValue] = useState<string>("м'яка")

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <>
            <div className="inputs-weight">
                Палітурка:
                <div className="inputs-weight__inputs">
                    <input
                        onChange={inputChangeHandler}
                        type="radio"
                        name={`cost-${id}`}
                        id={`cost1-${id}`}
                        defaultChecked={true}
                        value="м'яка"
                    />
                    <label htmlFor={`cost1-${id}`}>м'яка</label>
                    <input
                        onChange={inputChangeHandler}
                        type="radio"
                        name={`cost-${id}`}
                        id={`cost2-${id}`}
                        value="тверда"
                    />
                    <label htmlFor={`cost2-${id}`}>тверда</label>
                </div>
            </div>

            <div className="book-item__footer">
                <div className="book-item__cost">
                    <span>{inputValue === "м'яка" ? cost[0] : cost[1]}</span>{" "}
                    грн.
                </div>
                <ButtonAddToCart
                    id={`${id}-${inputValue}`}
                    name={name}
                    choose={inputValue}
                    cost={inputValue === "м'яка" ? cost[0] : cost[1]}
                    img={img}
                />
            </div>
        </>
    )
}

export default BookInputs
