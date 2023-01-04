import "./App.scss";
import DynamicBlob from "./components/DynamicBlob";

const App = () => {
  return (
    <div className="App">
      <DynamicBlob count={15} />
    </div>
  );
};

export default App;
