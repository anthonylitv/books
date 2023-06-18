import "./styles/NavigateBook.scss"
import { useParams } from "react-router-dom"
import bookApi from "../../services/bookApi"
import BookInputs from "../Main/BookInputs"
import CartReturnButton from "../Cart/CartReturnButton"
import Comments from "./Comments"

type NavigateBookParams = {
    id: string
}

const NavigateBook = () => {
    const { id } = useParams<NavigateBookParams>()

    const { data } = bookApi.useFetchBookQuery("")

    const currentItemBook = data?.assort.find(
        (item) => item.id.toString() === id
    )

    return (
        <div className="navigate-book">
            <div className="container">
                <div className="navigate-one">
                    <img
                        src={`${process.env.PUBLIC_URL}/img/book-items/${
                            currentItemBook?.img || ""
                        }`}
                        alt=""
                        className="navigate-book__img"
                    />

                    <div className="navigate-book__information">
                        <h1 className="navigate-book__name">
                            {currentItemBook?.name}
                        </h1>

                        <p className="navigate-book_author">
                            Автор: {currentItemBook?.author}
                        </p>

                        <p className="navigate-book_zanr">
                            Жанри: {currentItemBook?.zanr}
                        </p>

                        {currentItemBook && (
                            <BookInputs
                                id={currentItemBook.id}
                                name={currentItemBook.name}
                                cost={currentItemBook.cost}
                                img={currentItemBook.img}
                            />
                        )}

                        <p className="navigate-book_anotation">
                            {currentItemBook?.anotation}
                        </p>

                        <CartReturnButton />
                    </div>
                </div>
                <Comments />
            </div>
        </div>
    )
}

export default NavigateBook
