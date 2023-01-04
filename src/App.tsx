import "./App.scss";
import DynamicBlob from "./components/dynamicBlob/DynamicBlob";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

const App = () => {
  return (
    <div className="App">
      <DynamicBlob count={15} />
    </div>
  );
};

export default App;
