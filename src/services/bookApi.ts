import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IBook } from "../models/book"

const bookApi = createApi({
    reducerPath: "bookApi",
    tagTypes: ["books"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://books-a2888-default-rtdb.firebaseio.com/",
    }),
    endpoints: (build) => ({
        fetchBook: build.query<IBook, string>({
            query: (params: string) => ({
                url: params || "book.json",
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.assort.map(({ id }) => ({
                              type: "books" as const,
                              id,
                          })),
                          { type: "books", id: "LIST" },
                      ]
                    : [{ type: "books", id: "LIST" }],
        }),

        addBook: build.mutation({
            query: (body) => ({
                url: "book/assort.json",
                method: "PUT",
                body,
            }),

            invalidatesTags: [{ type: "books", id: "LIST" }],
        }),

        deleteBook: build.mutation({
            query: (id) => ({
                url: `book/assort/${id}.json`,
                method: "DELETE",
            }),

            invalidatesTags: [{ type: "books", id: "LIST" }],
        }),
    }),
})

export default bookApi
