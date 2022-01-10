import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "./Cart";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletionCard } from "./SkeletionCard";

export const HomeUi = (props) => {
    const {characters, isLoading, onAdd} = props;
  return (
    <div>
      <SkeletonTheme highlightColor="#444">
        {isLoading ? (
          <div className="my-data d-flex flex-wrap">
            <SkeletionCard />
            <SkeletionCard />
            <SkeletionCard />
            <SkeletionCard />
            <SkeletionCard />
            <SkeletionCard />
          </div>
        ) : (
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
                    <button
                      className="add-to-cart"
                      onClick={() => onAdd(character)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SkeletonTheme>
    </div>
  );
};
