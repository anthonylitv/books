import "./styles/Bookzanr.scss"
import { FC } from "react"
import React from "react"

interface IBookzanrProps {
    id: number
    zanr: string
}

const Bookzanr: FC<IBookzanrProps> = ({ zanr, id }) => {
    const zanrJSX = zanr.split(", ").map((item) => {
        return (
            <li key={`${item}=${id}`}>
                {item[0].toUpperCase() + item.slice(1)}
            </li>
        )
    })

    return (
        <>
            <div className="book-item__zanr">
                <ul className="book-item__zanr-overlay">{zanrJSX}</ul>
            </div>
        </>
    )
}

export default React.memo(Bookzanr)
