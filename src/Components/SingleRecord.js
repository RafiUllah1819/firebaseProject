import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const SingleRecord = () => {
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
          <div className="d-flex">  <h5 className="card-price">Price: <span className="user-price">{singleUser.price}</span></h5>
          <button></button>
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
