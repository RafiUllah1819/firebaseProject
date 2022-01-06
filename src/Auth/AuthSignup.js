import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/ConfigFirebase";
import { AuthSignIn } from "./AuthSignIn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthSignup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  });
  const [state, setState] = useState({
    email: "",
    emailErr: "",
    password: "",
    passwordErr: "",
    confirm_password: "",
    confirm_passwordErr: "",
  });
  const [validate, setValidate] = useState(false);

  const emailValidation = () => {
    let isErr = false;
    const errors = {
      emailErr: "",
      passwordErr: "",
      confirm_passwordErr: "",
    };
    if (state.password.length < 8) {
      isErr = true;
      errors.passwordErr = "password must be atleast 8 characters";
    }
    if (state.email.indexOf("@") === -1) {
      isErr = true;
      errors.emailErr = "Required valid email";
    }
  };

  const register = async () => {
    const { email, password, confirm_password } = state;
    const err = emailValidation();
    if (!err) {
      if (
        email.length < 1 ||
        email.indexOf("@") === -1 ||
        password.length < 1 ||
        confirm_password.length < 1 ||
        password !== confirm_password
      ) {
        setValidate(true);
      } else {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          setValidate(false);
          localStorage.setItem("token", user.user.accessToken);
          navigate("/home");
        } catch (error) {
          if (error.message) {
            console.log("invalid email");
          } else {
            setState({
              email: "",
              password: "",
              confirm_password: "",
            });
          }
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
  const onChangeConPassword = (e) => {
    const copy = { ...state };
    copy.confirm_password = e.target.value;
    setState(copy);
  };

  const emptyField = () => {
    setState({
      email: "",
      password: "",
      confirm_password: "",
    });
  };

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
    <div className="wrap">
      <div className="form-section">
        <div className="signup-form form">
          <h5>Create new Account</h5>
          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              value={state.email}
              onChange={onChangeEmail}
            />
            {validate && state.email == "" ? (
              <span className="text-danger">Email is required</span>
            ) : null}
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
            {validate && state.password == "" ? (
              <span className="text-danger">Password is required</span>
            ) : null}
            {validate && state.password < 8 ? (
              <span className="text-danger">
                Password must be greater than 8 characters
              </span>
            ) : null}
            {validate && state.password !== state.confirm_password ? (
              <span className="text-danger">Passwords don't match</span>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <input
              type="password"
              placeholder="Confirm_Password"
              className="form-control"
              value={state.confirm_password}
              onChange={onChangeConPassword}
            />
            {validate && state.confirm_password == "" ? (
              <span className="text-danger">Confirm_Password is required</span>
            ) : null}
          </div>

          <button
            className="add btn btn-success d-flex"
            onClick={() => {
              register();
            }}
          >
            Register
          </button>
        </div>
        <div>
          <AuthSignIn />
        </div>
      </div>
    </div>
  );
};
