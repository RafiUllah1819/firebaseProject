import React from "react";

export const Cart = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  const totalAmount = cartItems.reduce((a, c) => {
    return a + c.qty * c.price;
  }, 0);
  console.log("totalamount", totalAmount);
  return (
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
                  <span className="my-3">Price: ${item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cartItems !== 0 ? (
          <div>Total Amount: ${totalAmount.toFixed(2)}</div>
        ) : (
          <span>0</span>
        )}
      </div>
    </div>
  );
};
