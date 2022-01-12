import React, { useEffect, useState } from "react";
import { constextNode } from "./Context";
import axios from "axios";

export const ContextStates = (props) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState();

  console.log("%cContextState.js line:11 total", "color: #007acc;", total);

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        setCharacters(res.data);
        setIsLoading(false);
      });
    }, 2000);
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce((a, c) => {
      return a + c.qty * c.price;
    }, 0);
    setTotal(totalAmount);
  }, [cartItems]);

  const onAdd = (product) => {
    const exist = cartItems.find(
      (cartItemEntity) => cartItemEntity.id === product.id
    );
    console.log("itemIndex", exist);
    if (exist) {
      const updateCart = [...cartItems];
      const updatedCopy = updateCart.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartItems(updatedCopy);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find(
      (cartItemsEntity) => cartItemsEntity.id === product.id
    );
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const contextData = {
    characters,
    onAdd,
    onRemove,
    cartItems,
    total,
    isLoading,
  };

  return (
    <div>
      <constextNode.Provider value={contextData}>
        {props.children}
      </constextNode.Provider>
    </div>
  );
};
