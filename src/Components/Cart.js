import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CartContext = createContext();
export const ContextProvider = ({ children }) => (
  <CartContext.Provider value={useState([])}>{children}</CartContext.Provider>
);
export const useCartContext = () => useContext(CartContext);

export const Cart = (props) => {
  const { cartItems, onAdd, onRemove } = props;

  const [total, setTotal] = useState(0);

  const totalAmount = cartItems.reduce((a, c) => {
    return a + c.qty * c.price;
  }, 0);

  useEffect(() => {
    cartItems.reduce((a, c) => {
      let total = a + c.qty * c.price;
      setTotal(total);
    }, 0);
  }, [cartItems]);
  // setTotal(
  //   cartItems.reduce((a, c) => {
  //     return a + c.qty * c.price;
  //   }, 0)
  // );

  console.log("totalamount", totalAmount);

  return (
    console.log("totalzz", total),
    (
      <div className="cart-info-section mt-4">
        <h4>Cart Items</h4>
        <div className="cart-empty">
          {" "}
          {cartItems.length === 0 && <h3>Cart item is empty</h3>}
          {cartItems.map((item) => (
            <div key={item.id} className="">
              <h6 className="my-4"> {item.title}</h6>
              <div className="cart-detail d-flex">
                <div className="cart-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="cart-info">
                  <div className="add-remove-btns">
                    <button
                      className="btn btn-success"
                      onClick={() => onAdd(item)}
                    >
                      +
                    </button>
                    <span className="quantity">{item.qty}</span>
                    <button
                      className="btn btn-danger"
                      onClick={() => onRemove(item)}
                    >
                      -
                    </button>
                  </div>
                  <div className="price">
                    <span className="my-3">
                      Price: ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {cartItems !== 0 ? (
            <div>Total Amount: ${total.toFixed(2)}</div>
          ) : (
            <span>0</span>
          )}
          {cartItems.length !== 0 ? (
            <Link to="/checkout" className="check-out-btn">
              Go to Checkout
            </Link>
          ) : null}
        </div>
      </div>
    )
  );
};
