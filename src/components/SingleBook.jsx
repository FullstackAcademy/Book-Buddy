import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetBookByIdQuery, useCheckoutBookMutation } from "../store-slice";

const SingleBook = () => {
  const { bookId } = useParams();

  const { data } = useGetBookByIdQuery(bookId);

  const [checkoutBook] = useCheckoutBookMutation();
  const isLoggedIn = !!useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to check out books.");
      return;
    }
    try {
      await checkoutBook({ bookId, token }).unwrap();
      alert(`You checked out: ${data.book.title}`);
    } catch (err) {
      alert("We couldn't check this book out for you.");
    }
  };

  if (!data || !data.book) {
    return <div>Book not found</div>;
  }
  const book = data.book;

  return (
    <div className="container">
        <div className="card">
            <div className="card-content">
      <h2 className="card-title">{book.title}</h2>
      <p className="card-author">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="card-description">
        <strong>Description:</strong> {book.description}
      </p>
      <p>Status: {book.available ? "Available" : "Checked Out"}</p>
      {!isLoggedIn && (
        <p>
          Please <a href="/login">Log in</a> to check out books.{" "}
        </p>
      )}
      {isLoggedIn && book.available && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
    </div>
    </div>
  );
};

export default SingleBook;
