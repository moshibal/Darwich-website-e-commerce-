import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product-slice";
import cartReducer from "./cart-slice";
import loginReducer from "./login-slice";
import registerReducer from "./register-slice";
import userDetailReducer from "./user-detail";
import shippingReducer from "./shipping-slice";
import paymentReducer from "./payment-slice";
import orderReducer from "./order-slice";
import orderDetailReducer from "./orderDetails-slice";
import orderPayReducer from "./order-pay-slice";
import myOrderReducer from "./my-order-slice";
import userListReducer from "./userList-slice";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: loginReducer,
    register: registerReducer,
    userDetails: userDetailReducer,

    userLists: userListReducer,
    shipping: shippingReducer,
    payment: paymentReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderReducer,
  },
});
export default store;
