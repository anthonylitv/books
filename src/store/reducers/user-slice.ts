import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: JSON.parse(localStorage.getItem("user") as any)?.email || null,
    token: JSON.parse(localStorage.getItem("user") as any)?.token || null,
    id: JSON.parse(localStorage.getItem("user") as any)?.id || null,
    isModalAuthShowed: false,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id

            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: action.payload.email,
                    token: action.payload.token,
                    id: action.payload.id,
                })
            )
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null

            localStorage.removeItem("user")
        },
        setModalAuthShowed(state, action) {
            state.isModalAuthShowed = action.payload
        },
    },
})

export const { setUser, removeUser, setModalAuthShowed } = userSlice.actions

export default userSlice.reducer
