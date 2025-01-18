import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Slices
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
    }),
    getAccountData: builder.query({
      query: () => "/users/me",
    }),
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),
    checkoutBook: builder.mutation({
      query: ({ bookId, token }) => ({
        url: `/books/${bookId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          available: false,
        },
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    checkedOutBooks: [],
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    checkBookOut(state, action) {
      state.checkedOutBooks.push(action.payload);
    },
    returnBook(state, action) {
      state.checkedOutBooks = state.checkedOutBooks.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

//Store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    books: booksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const { setUser, logout } = authSlice.actions;
export const { setBooks, checkBookOut, returnBook } = booksSlice.actions;
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAccountDataQuery,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCheckoutBookMutation,
} = apiSlice;
export default store;
