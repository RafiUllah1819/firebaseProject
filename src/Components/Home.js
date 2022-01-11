import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";
import { Cart } from "./Cart";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeUi } from "./HomeUi";

export const CharacterContext = createContext();
export const ContextProvider = ({ children }) => (
  <CharacterContext.Provider value={useState([])}>
    {children}
  </CharacterContext.Provider>
);
export const useCharacterContext = () => useContext(CharacterContext);

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [cartItems, setCartItems] = useCharacterContext();
  const [isLoading, setIsLoading] = useState(true);
  console.log("cartitemslength", cartItems.length);

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        setCharacters(res.data);
        setIsLoading(false);
      });
    }, 2000);
  }, []);
  console.log("characters", characters);

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
 
  console.log("cartItemssss", cartItems);

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
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <HomeUi characters={characters} isLoading={isLoading} onAdd={onAdd} />
        </div>
        <div className="col-md-3">
          <div className="cart-section">
            <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
