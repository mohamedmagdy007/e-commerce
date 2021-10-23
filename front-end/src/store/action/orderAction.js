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

export const payOrder = (order, paymentResult)=> async(dispatch)=>{
  dispatch({ type: "ORDER_PAY_REGUEST", payload: {order,paymentResult} });
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    console.log(userInfo.token)
    const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    });
    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_PAY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const listOrderMine = () => async(dispatch)=>{
  dispatch({ type: "ORDER_MINE_LIST_REGUEST", });
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    console.log(userInfo.token)
    const { data } = await axios.get(`/api/orders/mine`,{
      headers: {
        Authorization: `${userInfo.token}`,
      },
    });
    dispatch({ type: "ORDER_MINE_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "ORDER_MINE_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const listOrders = () => async (dispatch) => {
  dispatch({ type: "ORDER_LIST_REQUEST" });
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = await axios.get('/api/orders/', {
      headers: { Authorization: `${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: "ORDER_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_LIST_FAIL", payload: message });
  }
};
export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "ORDER_DELETE_REQUEST", payload: orderId }); 
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `${userInfo.token}` },
    });
    dispatch({ type: "ORDER_DELETE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_DELETE_FAIL", payload: message });
  }
};
export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "ORDER_DELIVER_REQUEST", payload: orderId });

  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `${userInfo.token}` },
      }
    );
    dispatch({ type: "ORDER_DELIVER_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: "ORDER_DELIVER_FAIL", payload: message });
  }
};