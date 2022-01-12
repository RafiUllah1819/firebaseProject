
import { Cart } from "./Cart";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeUi } from "./HomeUi";

export const Home = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <HomeUi  />
        </div>
        <div className="col-md-3">
          <div className="cart-section">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};
