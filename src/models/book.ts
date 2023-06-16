export interface IBookItem {
    id: number
    name: string
    kategory: string
    cost: number[]
    zanr: string
    img: string
    author: string
    anotation: string
}

export interface IBookKategory {
    id: number
    kategory: string
}

export interface IBook {
    kategories: IBookKategory[]
    assort: IBookItem[]
}

export interface ICartItem {
    id: string
    name: string
    choose: string
    cost: number
    amount: number
    img: string
    totalCost: number
}

export type CartItemProps = Omit<ICartItem, "amount" | "totalCost">
