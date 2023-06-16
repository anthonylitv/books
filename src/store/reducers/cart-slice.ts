import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICartItem } from "../../models/book"

interface CartState {
    items: ICartItem[]
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cartItems")!) || [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBookToCart(state, action: PayloadAction<ICartItem>) {
            const currentItem = state.items.find(
                (item) =>
                    action.payload.id === item.id &&
                    action.payload.choose === item.choose
            )

            if (currentItem) {
                currentItem.amount++
            } else {
                state.items.push(action.payload)
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },

        amountPlus(state, action: PayloadAction<string>) {
            const currentItem = state.items.find(
                (item) => item.id === action.payload
            )

            currentItem!.amount++
            currentItem!.totalCost += currentItem!.cost

            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },

        amountMinus(state, action: PayloadAction<string>) {
            const currentItem = state.items.find(
                (item) => item.id === action.payload
            )

            currentItem!.amount--
            currentItem!.totalCost -= currentItem!.cost

            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },

        deleteBook(state, action: PayloadAction<string>) {
            const currentItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            )

            state.items.splice(currentItemIndex, 1)

            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },

        clearCart(state) {
            state.items = []

            localStorage.setItem("cartItems", JSON.stringify(state.items))
        },
    },
})

export default cartSlice
