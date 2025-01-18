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
    <div className="constainer">
      <h2>Book Catalog</h2>
      <div className="books-list">
      {books.map((book) => (
    <div className="card" key={book.id}>
        <div className="card-content">
          <Link to={`/books/${book.id}`}>
            <h3 className="card-title">{book.title}</h3>
            <p className="card-author">Author: {book.author}</p>
          </Link>
          </div>
        </div>
        
      ))}
    </div>

    </div>
  );
};

export default Books;
