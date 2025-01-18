import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../store-slice";
import { setBooks } from "../store-slice";

const Books = () => {
  const dispatch = useDispatch();

  const { data } = useGetBooksQuery();

  useEffect(() => {
    if (data && data.books) {
      dispatch(setBooks(data.books));
    }
  }, [data, dispatch]);

  const books = useSelector((state) => state.books.books);

  if (!Array.isArray(books) || books.length === 0) {
    return <div>No books available at the moment.</div>;
  }

  return (
    <div>
      <h1>Book Catalog</h1>
      {books.map((book) => (
        <li key={book.id}>
          <Link to={`/books/${book.id}`}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Books;
