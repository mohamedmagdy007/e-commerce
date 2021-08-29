import axios from "axios";
export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: "ORDER_CREATE_REGUEST", payload: order });
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    console.log(userInfo.token)
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    });
    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data.order });
    dispatch({ type: "CART_EMPTY" });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const detailsOrder =(orderId)=> async(dispatch )=>{
  dispatch({ type: "ORDER_DETAILS_REGUEST", payload: orderId });
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    console.log(userInfo.token)
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    });
    console.log(data)
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data});
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
