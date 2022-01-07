import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "./Cart";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => setCharacters(res.slice(0, 6)))
      .catch((err) => console.log(err));
  }, []);
  console.log("characters", characters);

  const onAdd = (product) => {
    const exist = cartItems.find(cartItemEntity  => cartItemEntity.id === product.id);
    console.log('itemIndex',exist)
    if(exist){
      const updateCart = [...cartItems]
      const updatedCopy = updateCart.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1}: x) 
      setCartItems(updatedCopy)
    }else{
      setCartItems([...cartItems, {...product, qty: 1}])
    }
    // console.log('adddbutton')
  }
console.log('cartItemssss' , cartItems)
  //  const newArr = characters.slice(0 , 15)
  //  console.log('newarr' , newArr)

  
  const onRemove = (product) =>{
    const exist = cartItems.find(cartItemsEntity => cartItemsEntity.id === product.id);
    if(exist.qty === 1){
      setCartItems(
        cartItems.filter((x) => x.id !== product.id))
    }else{
      setCartItems(
        cartItems.map((x) => x.id === product.id ? {...exist, qty: exist.qty -1 } :x )
      )
    }
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="my-data d-flex flex-wrap">
            {characters.map((character, i) => {
              return (
                <div className="card total">
                  <div className="card-body">
                    <div className="card-image">
                      <img src={character.image} alt="" />
                    </div>
                    <h6 className="card-title">{character.title}</h6>
                    <span className="card-price">Price: {character.price}</span>
                    <span className="card-category">
                      Category: {character.category}
                    </span>
                    <Link to={`/singleRecord/${i}`}>More</Link>
                    <button className="add-to-cart" onClick={()=>onAdd(character)}>Add to Cart</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-3">
          <div className="cart-section">
            <Cart onAdd = {onAdd} onRemove = {onRemove} cartItems ={cartItems}/>
          </div>
        </div>
      </div>
    </div>
  );
};
