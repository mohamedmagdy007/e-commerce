import axios from "axios";
export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
    payload: { name, email, password },
  });
  try {
    const { data } = await axios.post(`/api/users/register`, {
      name,
      email,
      password,
    });
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "USER_SIGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const singin = (email, password) => async (dispatch) => {
  dispatch({
    type: "USER_SIGIN_REQUEST",
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(`/api/users/signin`, { email, password });
   console.log(data)
    dispatch({ type: "USER_SIGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_SIGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const ForgetPass= (email) => async (dispatch) => {
  dispatch({
    type: "FORGET_PASS_REQUEST",
    payload: { email},
  });
  try {
    const { data } = await axios.post(`/api/users/resetPassword`,  email);
    dispatch({ type: "FORGET_PASS_SUCCESS", payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "FORGET_PASS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const resetPassword = (passId,tokenId,password) => async (dispatch) => {
  dispatch({
    type: "RESET_PASS_REQUEST",
    payload: { password},
  });
  try {
    const { data } = await axios.post(`/api/users/resetPassword/${passId}/${tokenId}`,  password);
    dispatch({ type: "RESET_PASS_SUCCESS", payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "RESET_PASS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: "USER_SIGNOUT" });
};
export const detailsUser = (userId)=> async (dispatch)=>{
  dispatch({ type: "USER_DETAILS_REGUEST", payload: userId});
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = await axios.get(`/api/users/${userId}`,{
      headers: {
        Authorization: `${userInfo.token}`,
      },
    });
    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const updateUserProfile = (user)=> async (dispatch)=>{
  dispatch({ type: "USER_UPDATE_PROFILE_REGUEST", payload: user});
  try {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const { data } = await axios.put(`/api/users/profile`,user,{
      headers: {
        Authorization: `${userInfo.token}`,
      },
    });
    dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data });
    dispatch({ type: "USER_SIGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}