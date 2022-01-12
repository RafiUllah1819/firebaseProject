import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { constextNode } from "../Context/Context";

export const SingleRecord = () => {
  const { onAdd, onRemove, cartItems } = useContext(constextNode);

  const { id } = useParams();
  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => setSingleUser(res));
  }, []);

  console.log("single user", singleUser);

  return (
    <div>
      <div className="card single-record">
        <div className="card-body d-flex justify-content-between">
          <div className="card-detail">
            <h4 className="card-title">{singleUser.title}</h4>
            <h6 className="card-description">{singleUser.description}</h6>
            <div className="d-flex align-items-center">
              <h5 className="card-price">
                Price: <span className="user-price">{singleUser.price}</span>
              </h5>
              <div className="cart-button">
                <button onClick={() => onAdd(singleUser.id)}>+</button>
                {cartItems.map((item) => {
                  return (
                    <span>{item.qty === 0 ? <span>0</span> : item.qty}</span>
                  );
                })}

                <button onClick={() => onRemove(singleUser.id)}>-</button>
              </div>
            </div>
            <div className="cart-btns">
              <button
                className="btn btn-primary cart-btn"
                onClick={() => onAdd(singleUser.id)}
              >
                Add to Cart
              </button>
              <Link to="/checkout">Go to CheckOut</Link>
            </div>
          </div>
          <div className="card-image">
            <img src={singleUser.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
