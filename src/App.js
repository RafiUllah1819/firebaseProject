import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routers } from "./Routers";
import { ContextProvider } from "./Components/Home";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Routers />
      </div>
    </ContextProvider>
  );
}

export default App;
