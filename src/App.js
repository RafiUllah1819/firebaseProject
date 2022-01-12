import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routers } from "./Routers";

import { ContextStates } from "./Context/ContextState";

function App() {
  return (
    <ContextStates>
      <div className="App">
        <Routers />
      </div>
    </ContextStates>
  );
}

export default App;
