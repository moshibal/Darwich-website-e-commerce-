import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import AvailableProductScreen from "./screens/AvailableProductScreen";
import SpecialProductScreen from "./screens/SpecialProductScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import FinalPaymentScreen from "./screens/FinalPaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<HomeScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="/payment" element={<PaymentScreen />}></Route>
      <Route path="/placeorder" element={<FinalPaymentScreen />} />

      <Route path="/order/:orderId" element={<OrderScreen />} />
      <Route path="/products/:productId" element={<ProductDetailScreen />} />
      <Route path="products/available" element={<AvailableProductScreen />} />
      <Route path="/products/special" element={<SpecialProductScreen />} />
      <Route path="/cart/:productId" element={<CartScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/admin/userlist" element={<UserListScreen />} />
    </Routes>
  );
}

export default App;
