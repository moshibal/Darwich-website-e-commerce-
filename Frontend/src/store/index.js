import { configureStore } from "@reduxjs/toolkit";
//reducers
import subscribeReducer from "./subscribe-slice";
import reviewReducer from "./review-slice";
import cartReducer from "./cart-slice";
import loginReducer from "./login-slice";
import registerReducer from "./register-slice";
import forgetReducer from "./forget-password-slice";
import resetReducer from "./reset-password-slice";
import userDetailReducer from "./user-detail";
import shippingReducer from "./shipping-slice";
import paymentReducer from "./payment-slice";
import orderReducer from "./order-slice";
import orderDetailReducer from "./orderDetails-slice";
import orderPayReducer, { orderDeliverSlice } from "./order-pay-slice";
import myOrderReducer, { allOrderSlice } from "./my-order-slice";
import userListReducer, {
  userUpdateSlice,
  userDeleteSlice,
  getUserByIDSlice,
} from "./userList-slice";
import productReducer, {
  getProductById,
  productCreateSlice,
  productDeleteSlice,
  productUpdateSlice,
} from "./product-slice";
import specialProductReducer from "./specialProduct-slice";

const store = configureStore({
  reducer: {
    subscibtion: subscribeReducer,
    product: productReducer,
    specialProduct: specialProductReducer,
    productDetailsById: getProductById.reducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    review: reviewReducer,
    cart: cartReducer,
    user: loginReducer,
    register: registerReducer,
    forgetpassword: forgetReducer,
    resetPassword: resetReducer,
    userDetails: userDetailReducer,
    userDetailsById: getUserByIDSlice.reducer,
    userLists: userListReducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
    shipping: shippingReducer,
    payment: paymentReducer,
    order: orderReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverSlice.reducer,
    myOrderList: myOrderReducer,
    orderLists: allOrderSlice.reducer,
  },
});
export default store;
