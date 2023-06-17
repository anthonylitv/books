import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: null,
    token: null,
    id: null,
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
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
        },
        setModalAuthShowed(state, action) {
            state.isModalAuthShowed = action.payload
        },
    },
})

export const { setUser, removeUser, setModalAuthShowed } = userSlice.actions

export default userSlice.reducer
