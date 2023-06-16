import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IBook } from "../models/book"

const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://books-a2888-default-rtdb.firebaseio.com/",
    }),
    endpoints: (build) => ({
        fetchBook: build.query<IBook, string>({
            query: (params: string) => ({
                url: "book.json",
            }),
        }),
    }),
})

export default bookApi
