import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { useDebounce } from "../../hooks/debounce"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import searchEmptyBooks from "../../hooks/searchEmptyBooks"
import bookApi from "../../services/bookApi"
import bookSlice from "../../store/reducers/book-slice"
import "./styles/SearchInput.scss"

const SearchInput = () => {
    const { data } = bookApi.useFetchBookQuery("")

    const firstEffect = useRef<boolean>(true)

    const input = useRef<HTMLInputElement>(null)

    const currentKategory = useAppSelector((state) =>
        state.bookSlice.currentKategory.toLowerCase()
    )
    const searchValue = useAppSelector((state) => state.bookSlice.searchValue)
    const dispatch = useAppDispatch()

    const [inputing, setInputing] = useState<string>(searchValue)

    const [isFocused, setIsFocused] = useState<boolean>(false)

    const debounced = useDebounce(inputing)

    const books = searchEmptyBooks(searchValue, data?.assort || [])

    const isShowEmptySearch =
        books.length === 0 && searchValue.length > 0 && isFocused

    useEffect(() => {
        dispatch(bookSlice.actions.setSearchValue(inputing))

        if (isFocused && currentKategory !== "всі" && books.length > 0) {
            dispatch(bookSlice.actions.setKategory("Всі"))
        }
    }, [debounced])

    useEffect(() => {
        if (firstEffect.current) {
            firstEffect.current = false
            return
        }

        if (searchValue.length > 0 && !isFocused) {
            setInputing("")
        }
    }, [currentKategory])

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputing(event.target.value)
    }

    const inputFocusHandler = () => {
        setIsFocused(true)
    }

    const inputBlurHandler = () => {
        setIsFocused(false)
    }

    const xmarkClickHandler = () => {
        setInputing("")
        dispatch(bookSlice.actions.setSearchValue(""))
    }

    return (
        <>
            {isShowEmptySearch &&
                ReactDOM.createPortal(
                    <div className="header-search-empty-overlay"></div>,
                    document.getElementById("app")!
                )}

            <div className="header-search">
                {isShowEmptySearch && (
                    <div className="header-search__empty-title">
                        По вашому запиту нічого не зайдено. Уточніть свій запит
                    </div>
                )}

                <input
                    value={inputing}
                    onChange={inputChangeHandler}
                    ref={input}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    type="text"
                    placeholder="Пошук книги..."
                    className="header-search__input"
                    maxLength={50}
                />

                <svg
                    className="header-search__svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                </svg>

                {inputing.length > 0 && (
                    <svg
                        onClick={xmarkClickHandler}
                        className="header-search__xmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                )}
            </div>
        </>
    )
}

export default SearchInput
