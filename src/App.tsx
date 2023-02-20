import Context from "./context/Context";
import RouterApp from "./router/RouterApp";

function App() {
  return (
    <Context>
      <RouterApp />
    </Context>
  );
}

export default App;
