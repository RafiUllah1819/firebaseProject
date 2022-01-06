import React, { useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Config/ConfigFirebase";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthSignIn = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [validate, setValidate] = useState(false)

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // console.log('.users....' , user)
  // console.log('auth....' , auth)

  const login = async () => {
    const { email, password } = state;
    if(email.length<1 || email.indexOf("@") === -1 || password.length<1 ){
      setValidate(true)
    }else{
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        setValidate(false)
        console.log("userlogin", user.user.accessToken);
        localStorage.setItem('token' , user.user.accessToken )
        navigate("/home");
      } catch (error) {
        if(error){
          setValidate(true)
        }
      }
    }
  };

  const onChangeEmail = (e) => {
    const copy = { ...state };
    copy.email = e.target.value;
    setState(copy);
  };
  const onChangePassword = (e) => {
    const copy = { ...state };
    copy.password = e.target.value;
    setState(copy);
  };

  // console.log('store' , user.accessToken)

  const errors = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const success = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    // <div className="form-section">
    <div className="signup-form form">
      <h5>If already has account</h5>
      <div className="form-group mb-2">
        <input
          type="text"
          placeholder="Email"
          className="form-control"
          value={state.email}
          onChange={onChangeEmail}
        />
        {validate && state.email == '' ? <span className="text-danger">Email is required</span> : null}
        {validate && state.email.indexOf("@") === -1 ? (
              <span className="text-danger">Invalid Email</span>
            ) : null}
      </div>

      <div className="form-group mb-2">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={state.password}
          onChange={onChangePassword}
        />
        {validate && state.password == ''?<span className="text-danger">Password is required</span>: null}
      </div>

      <button className="add btn btn-success d-flex" onClick={login}>
        Login
      </button>
    </div>

    // </div>
  );
};
