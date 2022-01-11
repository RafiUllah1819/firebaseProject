import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routers } from "./Routers";
import { ContextProvider } from "./Components/Home";
import { CartContextProvider } from "./Components/Cart";

function App() {
  return (
    <CartContextProvider>
      <ContextProvider>
        <div className="App">
          <Routers />
        </div>
      </ContextProvider>
    </CartContextProvider>
  );
}

export default App;
