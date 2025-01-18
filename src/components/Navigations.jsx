import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store-slice";

const Navigation = () => {
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = !!useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    alert("You've been logged out :)");
  };

  return (
    <nav>
      <Link to="/books">Books</Link>
      {isLoggedIn && token ? (
        <>
          <Link to="/account">My Account</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};
export default Navigation;
