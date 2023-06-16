import "./styles/Sorter.scss"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import bookSlice from "../../store/reducers/book-slice"

export const sortVariants = [
    "За популярністю",
    "Від дешевих до дорогих",
    "Від дорогих до дешевих",
]

const Sorter = () => {
    const dispatch = useAppDispatch()
    const currentSort = useAppSelector((state) => state.bookSlice.currentSort)

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const currentComponent = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (
                !currentComponent.current?.contains(event.target as HTMLElement)
            ) {
                setIsVisible(false)
            }
        }

        document.addEventListener("click", onClick)

        return () => document.removeEventListener("click", onClick)
    }, [])

    const menuChangeHandler = (item: string) => {
        dispatch(bookSlice.actions.setSort(item))
    }

    const visibilitySetHandler = () => {
        setIsVisible((previousState) => !previousState)
    }

    return (
        <div ref={currentComponent} className="sorter">
            <div
                className="sorter__main sorter__item"
                onClick={visibilitySetHandler}
            >
                {currentSort}

                <svg
                    className={isVisible ? "active" : ""}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                >
                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                </svg>
            </div>

            {isVisible && (
                <ul className="sorter__popup">
                    {sortVariants.map((item, index) => (
                        <li
                            className="sorter__item"
                            key={index}
                            onClick={() => {
                                menuChangeHandler(item)
                                visibilitySetHandler()
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Sorter
