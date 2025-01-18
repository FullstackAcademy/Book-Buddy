import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAccountDataQuery } from "../store-slice";
import { logout } from "../store-slice";
import { useNavigate, Link } from "react-router-dom";

const Account = () => {
  const isLoggedIn = !!useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: accountData } = useGetAccountDataQuery(token, {
    skip: !isLoggedIn,
  });
  const books = accountData?.books || [];

  useEffect(() => {
    if (!isLoggedIn) {
      alert("You're not logged in. Lets fix that?");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>You are not logged in</h2>
        <p>
          Please <Link to="/login">log in</Link> or{" "}
          <Link to="/register">create an account</Link> to see your account
          details.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container">
      <h2>Account Details</h2>
      {accountData ? (
        <>
          <p>
            <strong>Name:</strong> {accountData.name}
          </p>
          <p>
            <strong>Email:</strong> {accountData.email}
          </p>
          <p>
            <strong>Username:</strong> {accountData.username}
          </p>
          <h3>Your Checked-Out Books</h3>

          {books.length === 0 ? (
            <p>You have 0 books checked out.</p>
          ) : (
            
            <ul className="book-list">
              {books?.map((book) => (
                <li className="card" key={book.id}>
                    <div className="card-content"></div>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>No account data available.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Account;
