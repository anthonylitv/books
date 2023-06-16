import React from "react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { IBookItem } from "../../models/book"
import Bookzanr from "./Bookzanr"
import BookInputs from "./BookInputs"
import "./styles/BookItem.scss"

const BookItem: FC<IBookItem> = ({ id, name, cost, zanr, img }) => {
    const navigate = useNavigate()

    const bookNavigateHandler = () => {
        navigate(`/item/${id}`)
    }

    return (
        <div className="book-item">
            <img
                onClick={bookNavigateHandler}
                src={`${process.env.PUBLIC_URL}/img/book-items/${img}`}
                alt="Книжка"
                className="book-item__img"
                draggable={false}
            />

            <h1 className="book-item__name" onClick={bookNavigateHandler}>
                {name}
            </h1>

            <span className="book-item__open-zanr">Жанри</span>
            <Bookzanr id={id} zanr={zanr} />

            <BookInputs id={id} name={name} cost={cost} img={img} />
        </div>
    )
}

export default React.memo(BookItem)
