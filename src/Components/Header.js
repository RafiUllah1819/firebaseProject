import React, { useState, useEffect } from "react";
import { auth } from "../Config/ConfigFirebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
        <a className="navbar-brand" href="#">
          Navbar
        </a>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
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
