import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
 

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => setCharacters(res.slice(0, 20)))
      .catch((err) => console.log(err));
  }, []);
  console.log("characters", characters);

  //  const newArr = characters.slice(0 , 15)
  //  console.log('newarr' , newArr)

  return (
    <div className="container">
      <div className="my-data d-flex flex-wrap">
          {characters.map((character, i)=>{
            return(
              <div className="card total">
                  <div className="card-body">
                    <div className="card-image">
                      <img src={character.image} alt="" />
                    </div>
                    <h6 className="card-title">{character.title}</h6>
                    <span className="card-price">Price: {character.price}</span>
                    <span className="card-category">Category: {character.category}</span>
                <Link to={`/singleRecord/${i}`}>More</Link>
                  </div>
              </div>
            )
          })}
      </div>
    </div>
  );
};
