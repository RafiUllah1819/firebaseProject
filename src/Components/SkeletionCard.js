import React from "react";
import Skeleton from "react-loading-skeleton";

export const SkeletionCard = () => {
  return (
    <div className="card total">
      <Skeleton circle={true} height={100} width={100} />
      <h6 className="card-title mt-3">
        <Skeleton width={300} />
      </h6>
      <h6 className="card-title">
        <Skeleton width={300} />
      </h6>
      <h6 className="card-title">
        <Skeleton width={300} />
      </h6>
    </div>
  );
};
