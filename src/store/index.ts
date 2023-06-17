import { combineReducers, configureStore } from "@reduxjs/toolkit"
import bookApi from "../services/bookApi"
import cartSlice from "./reducers/cart-slice"
import bookSlice from "./reducers/book-slice"
import userSliceReducer from "./reducers/user-slice"

const rootReducer = combineReducers({
    cartSlice: cartSlice.reducer,
    bookSlice: bookSlice.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    user: userSliceReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
