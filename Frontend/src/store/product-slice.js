import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const productSlice = createSlice({
  name: "productlists",
  initialState: { products: [], loading: false, message: null },
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.products = [];
    },
    productSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.pages = action.payload.pages;
      state.pageNumber = action.payload.pageNumber;
    },
    productFail(state, action) {
      state.loading = false;
      state.products = [];
      state.message = action.payload;
    },
  },
});

export const { productFail, productSuccess, productRequest } =
  productSlice.actions;
export const fetchProducts = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch(productRequest());
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch(productSuccess(data));
    } catch (error) {
      dispatch(
        productFail(
          error.response?.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
//fetch product by id
export const getProductById = createSlice({
  name: "productById",
  initialState: { product: {}, loading: false, message: null },
  reducers: {
    productByIdRequest(state) {
      state.loading = true;
    },
    productByIdSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    productByIdFail(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    productByIdReset(state) {
      state.product = {};
    },
  },
});

export const {
  productByIdFail,
  productByIdSuccess,
  productByIdRequest,
  productByIdReset,
} = getProductById.actions;
export const fetchProductById = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(productByIdRequest());
      const { data } = await axios.get(`/api/products/${productId}`);

      dispatch(productByIdSuccess(data));
    } catch (error) {
      dispatch(productFail({ message: "failed to fetch the products" }));
    }
  };
};

//product delete slice
export const productDeleteSlice = createSlice({
  name: "productDeleteSlice",
  initialState: { loading: false, success: false, message: null },
  reducers: {
    productDeleteRequest(state) {
      state.loading = true;
    },
    productDeleteSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    productDeleteFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
    },
  },
});
const { productDeleteFail, productDeleteSuccess, productDeleteRequest } =
  productDeleteSlice.actions;
export const deleteProduct = (productID) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productDeleteRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      await axios.delete(
        `/api/products/${productID}`,

        config
      );

      dispatch(productDeleteSuccess());
    } catch (error) {
      dispatch(
        productDeleteFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
//product create slice
export const productCreateSlice = createSlice({
  name: "productCreateSlice",
  initialState: { loading: false, success: false, message: null, product: {} },
  reducers: {
    productCreateRequest(state) {
      state.loading = true;
    },
    productCreateSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    productCreateFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
    },
    productCreateReset(state) {
      state.product = {};
    },
  },
});
export const {
  productCreateFail,
  productCreateSuccess,
  productCreateRequest,
  productCreateReset,
} = productCreateSlice.actions;
export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(productCreateRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.post(`/api/products`, {}, config);

      dispatch(productCreateSuccess(data));
    } catch (error) {
      dispatch(
        productCreateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};
//product update slice
export const productUpdateSlice = createSlice({
  name: "productUpdateSlice",
  initialState: { loading: false, success: false, message: null, product: {} },
  reducers: {
    productUpdateRequest(state) {
      state.loading = true;
    },
    productUpdateSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload;
    },
    productUpdateFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
    },
    productUpdateReset(state) {
      state.product = {};
      state.success = false;
    },
  },
});
export const {
  productUpdateFail,
  productUpdateSuccess,
  productUpdateRequest,
  productUpdateReset,
} = productUpdateSlice.actions;
export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productUpdateRequest());
      //get user info as it is protected
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch(productUpdateSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(
        productUpdateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export default productSlice.reducer;
