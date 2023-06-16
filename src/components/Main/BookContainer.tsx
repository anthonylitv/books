import "./styles/BookContainer.scss"
import { useAppSelector } from "../../hooks/redux"
import bookApi from "../../services/bookApi"
import BookItem from "./BookItem"
import SkeletonBookItem from "../Skeleton/SkeletonBookItem"
import searchEmptyBooks from "../../hooks/searchEmptyBooks"
import { sortVariants } from "./Sorter"

const BookContainer = () => {
    const { data, isLoading, isError } = bookApi.useFetchBookQuery("")

    const searchValue = useAppSelector((state) =>
        state.bookSlice.searchValue.trim().toLowerCase()
    )

    const currentKategory = useAppSelector((state) =>
        state.bookSlice.currentKategory.toLowerCase()
    )

    const currentSort = useAppSelector((state) => state.bookSlice.currentSort)

    let books = data?.assort || []
    let booksJSX

    const filteredBooksCopy = searchEmptyBooks(searchValue, books)

    if (currentKategory !== "всі") {
        books = books?.filter((item) =>
            item.zanr.toLowerCase().includes(currentKategory)
        )
    }

    if (searchValue.length !== 0 && filteredBooksCopy.length > 0) {
        books = filteredBooksCopy
    }

    if (currentSort === sortVariants[1]) {
        books = [...books]?.sort((a, b) => a.cost[0] - b.cost[0])
    } else if (currentSort === sortVariants[2]) {
        books = [...books]?.sort((a, b) => b.cost[0] - a.cost[0])
    }

    if (books.length > 0) {
        booksJSX = books?.map((item) => (
            <BookItem
                key={item.id}
                id={item.id}
                name={item.name}
                kategory={item.kategory}
                cost={item.cost}
                zanr={item.zanr}
                img={item.img}
            />
        ))
    }

    return (
        <div className="book-container">
            {isLoading
                ? [...new Array(8)].map((_, index) => (
                      <SkeletonBookItem key={index} />
                  ))
                : booksJSX}
        </div>
    )
}

export default BookContainer
