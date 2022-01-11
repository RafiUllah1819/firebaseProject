import React, { useState } from "react";
import { useCartContext } from "./Cart";
import { useNavigate } from "react-router-dom";
import { useCharacterContext } from "./Home";
import { toast } from "react-toastify";

export const Checkout = () => {
  const navigate = useNavigate();
  const [cartitems] = useCharacterContext();
  const [total] = useCartContext();
  const [validate, setValidate] = useState(false);
  const [orderRecord, setOrderRecord] = useState([]);
  const [state, setState] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
  });

  console.log("%cCheckout.js line:17 object", "color: #007acc;", total);

  const onChangeFname = (e) => {
    setState({
      ...state,
      fname: e.target.value,
    });
  };

  const onChangeLname = (e) => {
    setState({
      ...state,
      lname: e.target.value,
    });
  };
  const onChangePhone = (e) => {
    setState({
      ...state,
      phone: e.target.value,
    });
  };
  const onChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };
  const onChangeAddress = (e) => {
    setState({
      ...state,
      address: e.target.value,
    });
  };
  const onChangeCity = (e) => {
    setState({
      ...state,
      city: e.target.value,
    });
  };
  const onChangeCountry = (e) => {
    setState({
      ...state,
      country: e.target.value,
    });
  };
  const onChangeZipcode = (e) => {
    setState({
      ...state,
      zipcode: e.target.value,
    });
  };

  const placeOrder = async () => {
    const { fname, lname, address, city, phone, country, email, zipcode } =
      state;
    if (
      fname.length < 1 ||
      lname.length < 1 ||
      address.length < 1 ||
      city.length < 1 ||
      phone.length < 1 ||
      country.length < 1 ||
      email.length < 1 ||
      email.indexOf("@") === -1 ||
      zipcode.length < 1
    ) {
      setValidate(true);
    } else {
      try {
        const obj = {
          fname,
          lname,
          address,
          city,
          phone,
          country,
          email,
          zipcode,
        };
        const copy = [...orderRecord];
        copy.push(obj);
        localStorage.setItem("myRecord", JSON.stringify(copy));
        setValidate(false);
        success("You have put an order");
        emptyField();
      } catch (err) {
        if (err) console.log(err);
      }
    }
  };
  const emptyField = () => {
    setState({
      fname: "",
      lname: "",
      address: "",
      city: "",
      phone: "",
      country: "",
      email: "",
      zipcode: "",
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
    <div className="container bansic-info d-flex">
      <div>
        <h5 className="">Basic Information</h5>
        <div className="d-flex">
          <div className="form-group m-1">
            <input
              className="form-control"
              placeholder="FirstName"
              value={state.fname}
              onChange={onChangeFname}
            ></input>
            {validate && state.fname === "" ? (
              <span className="text-danger">First Name is required</span>
            ) : null}
          </div>
          <div className="form-group m-1">
            <input
              className="form-control"
              placeholder="LastName"
              onChange={onChangeLname}
              value={state.lname}
            ></input>
            {validate && state.lname === "" ? (
              <span className="text-danger">Last name is required</span>
            ) : null}
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group m-1">
            <input
              className="form-control "
              placeholder="Phone Number"
              onChange={onChangePhone}
              value={state.phone}
            ></input>
            {validate && state.phone === "" ? (
              <span className="text-danger">phone number is required</span>
            ) : null}
          </div>
          <div className="form-group m-1">
            <input
              className="form-control "
              placeholder="Email"
              onChange={onChangeEmail}
              value={state.email}
            ></input>
            {/* {validate && state.email === "" ? (
              <span className="text-danger">Email is required</span>
            ) : null} */}
            {validate && state.email.indexOf("@") === -1 ? (
              <span className="text-danger">Invalid Email</span>
            ) : null}
          </div>
        </div>
        <div className="form-group m-1 address">
          <textarea
            className="form-control "
            placeholder="Address"
            onChange={onChangeAddress}
            value={state.address}
          ></textarea>
          {validate && state.address === "" ? (
            <span className="text-danger">Address is required</span>
          ) : null}
        </div>
        <div className="d-flex">
          <div className="form-group m-1 city">
            <input
              className="form-control "
              placeholder="City"
              onChange={onChangeCity}
              value={state.city}
            ></input>
            {validate && state.city === "" ? (
              <span className="text-danger">City is required</span>
            ) : null}
          </div>
          <div className="form-group m-1 city">
            <input
              className="form-control "
              placeholder="State"
              onChange={onChangeCountry}
              value={state.country}
            ></input>
            {validate && state.country === "" ? (
              <span className="text-danger">Country is required</span>
            ) : null}
          </div>
          <div className="form-group m-1 city">
            <input
              className="form-control "
              placeholder="Zip code"
              onChange={onChangeZipcode}
              value={state.zipcode}
            ></input>
            {validate && state.zipcode === "" ? (
              <span className="text-danger">Zip code is required</span>
            ) : null}
          </div>
        </div>
        <button className="btn btn-success mt-2" onClick={placeOrder}>
          Place Order
        </button>
      </div>
      <div className="product">
        <table className="table table-hover striped">
          <thead>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </thead>
          <tbody>
            {cartitems.map((cart, i) => {
              return (
                <tr key={i}>
                  <td>{cart.title}</td>
                  <td>{cart.price}</td>
                  <td>{cartitems.length}</td>
                  <td> $ {total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
