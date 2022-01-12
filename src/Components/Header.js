import React, { useState, useEffect, useContext } from "react";
import { auth } from "../Config/ConfigFirebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { constextNode } from "../Context/Context";

export const Header = () => {
 
  const [user, setUser] = useState({});
  const { cartItems } = useContext(constextNode);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
 
  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        console.log("signout");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-2 px-3">
        <Link className="navbar-brand" to="/home">
          MyShop
        </Link>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            <Link to="/checkout">
              <span className="cart-item">{cartItems.length}</span>
    
              <span className="cart-icon">
                <i className="fa fa-shopping-cart"></i>
              </span>
            </Link>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={logout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
