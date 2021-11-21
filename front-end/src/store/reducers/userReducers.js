export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGIN_REQUEST":
      return { loading: true };
    case "USER_SIGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_SIGIN_FAIL":
      return { loading: false, error: action.payload };
    case 'USER_SIGNOUT':
        return {} ;
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userForgetpassReducer = (state = {}, action) => {
  switch (action.type) {
    case "FORGET_PASS_REQUEST":
      return { loading: true };
    case "FORGET_PASS_SUCCESS":
      return { loading: false, success:true };
    case "FORGET_PASS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userResetPassReducer = (state = {}, action) => {
  switch (action.type) {
    case "RESET_PASS_REQUEST":
      return { loading: true };
    case "RESET_PASS_SUCCESS":
      return { loading: false, success:true };
    case "RESET_PASS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {loading:true}, action) => {
  switch (action.type) {
    case "USER_DETAILS_REGUEST":
      return { loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REGUEST":
      return { loading: true };
    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, success:true };
    case "USER_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_PROFILE_REST":
      return {};
    default:
      return state;
  }
};