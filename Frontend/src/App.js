import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
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
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import TermScreen from "./screens/TermScreen";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/privacy" element={<PrivacyScreen />} />
      <Route path="/term" element={<TermScreen />} />
      <Route path="/search/:keyword" element={<ProductScreen />} />
      <Route path="/products/page/:pageNumber" element={<ProductScreen />} />

      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/payment" element={<PaymentScreen />}></Route>
      <Route path="/placeorder" element={<FinalPaymentScreen />} />
      <Route path="/order/:orderId" element={<OrderScreen />} />
      <Route path="/products" element={<ProductScreen />} />
      <Route path="/products/:productId" element={<ProductDetailScreen />} />

      <Route path="/products/special" element={<SpecialProductScreen />} />
      <Route path="/cart/:productId" element={<CartScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/resetpassword/:token" element={<ResetPasswordScreen />} />
      <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />

      <Route path="/admin/userlist/:userId/edit" element={<UserEditScreen />} />
      <Route path="/admin/userlist" element={<UserListScreen />} />

      <Route
        path="/admin/productlist/:productId/edit"
        element={<ProductEditScreen />}
      />
      <Route path="/admin/productlist" element={<ProductListScreen />} />
      <Route path="/admin/orderlist" element={<OrderListScreen />} />
    </Routes>
  );
}

export default App;
