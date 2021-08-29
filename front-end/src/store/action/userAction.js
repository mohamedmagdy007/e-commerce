import axios from "axios";
export const register  = (name,email,password) => async(dispatch) =>{
  dispatch({
    type:'USER_REGISTER_REQUEST',
    payload:{name,email,password}
  })
  try{
    const { data } = await axios.post(`/api/users/register`,{name,email,password});
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "USER_SIGIN_SUCCESS", payload: data });
    localStorage.setItem('userInfo',JSON.stringify(data))
  }catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
}
export const singin  = (email,password) => async(dispatch) =>{
    dispatch({
        type:'USER_SIGIN_REQUEST',
        payload:{email,password}
    })
    try{
    const { data } = await axios.post(`/api/users/signin`,{email,password});
    dispatch({ type: "USER_SIGIN_SUCCESS", payload: data });
    localStorage.setItem('userInfo',JSON.stringify(data))
    }catch (error) {
        dispatch({
          type: "USER_SIGIN_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}
export const signout =()=>(dispatch)=>{
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({type:"USER_SIGNOUT"})
}