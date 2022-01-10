import React, { useState } from "react";

export const Checkout = () => {
  const [validate, setValidate] = useState(false);
  const [state, setState] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

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
  const onChangeState = (e) => {
    setState({
      ...state,
      state: e.target.value,
    });
  };
  const onChangeZipcode = (e) => {
    setState({
      ...state,
      zipcode: e.target.value,
    });
  };

  const placeOrder = () => {
    const { fname, lname, address, city, phone, state, email, zipcode } = state;
    if (
      fname.length < 1 ||
      lname.length < 1 ||
      address.length < 1 ||
      city.length < 1 ||
      phone.length < 1 ||
      state.length < 1 ||
      email.length < 1 ||
      zipcode.length < 1
    ) {
      setValidate(true);
    } else {
      setValidate(false);
      console.log("Data added");
    }
  };
  return (
    <div className="container bansic-info d-flex">
      <form>
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
              <span>First Name is empty</span>
            ) : null}
          </div>
          <div className="form-group m-1">
            <input className="form-control" placeholder="LastName"></input>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group m-1">
            <input className="form-control " placeholder="Phone Number"></input>
          </div>
          <div className="form-group m-1">
            <input className="form-control " placeholder="Email"></input>
          </div>
        </div>
        <div className="form-group m-1 address">
          <textarea className="form-control " placeholder="Address"></textarea>
        </div>
        <div className="d-flex">
          <div className="form-group m-1 city">
            <input className="form-control " placeholder="City"></input>
          </div>
          <div className="form-group m-1 city">
            <input className="form-control " placeholder="State"></input>
          </div>
          <div className="form-group m-1 city">
            <input className="form-control " placeholder="Zip code"></input>
          </div>
        </div>
        <button className="btn btn-success mt-2" onClick={placeOrder}>
          Place Order
        </button>
      </form>
      <div className="product">
        <table className="table table-hover striped">
          <thead>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </thead>
          <tbody>
            <tr>
              <td>Shirt</td>
              <td>1200</td>
              <td>3</td>
              <td>1200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
