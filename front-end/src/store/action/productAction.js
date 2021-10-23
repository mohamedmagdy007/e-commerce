import axios from "axios";
export const listProducts = () => async (dispatch) => {
  dispatch({
    type: "PRODUCT_LIST_REQUEST",
  });
  try {
    const { data } = await axios.get(`/api/products`);
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_LIST_FAIL", payload: error.message });
  }
};
export const detailsProducts = (id) => async (dispatch) => {
  dispatch({
    type: "PRODUCT_DETAILS_REQUEST",
    payload: id,
  });
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = (product) => async (dispatch) => {
  try {
  dispatch({ type: "PRODUCT_CREATE_REQUEST" });

    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = await axios.post(
      '/api/products',
      product,
      {
        headers: { Authorization: `${userInfo.token}` },
      }
    );
    dispatch({
      type: "PRODUCT_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "PRODUCT_CREATE_FAIL", payload: message });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: "PRODUCT_UPDATE_REQUEST", payload: product });

  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `${userInfo.token}` },
    });
    dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "PRODUCT_UPDATE_FAIL", error: message });
  }
};
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DELETE_REQUEST", payload: productId });
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `${userInfo.token}` },
    });
    dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "PRODUCT_DELETE_FAIL", payload: message });
  }
};