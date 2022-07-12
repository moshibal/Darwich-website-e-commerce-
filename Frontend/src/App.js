import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import AvailableProductScreen from "./screens/AvailableProductScreen";
import SpecialProductScreen from "./screens/SpecialProductScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="products/available" element={<AvailableProductScreen />} />
      <Route path="/products/special" element={<SpecialProductScreen />} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
