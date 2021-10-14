import { AUTH_SIGN_IN, AUTH_ERROR } from "../Actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  errorMessage: "",
};
const loginReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return { ...state, isAuthenticated: true };
    case AUTH_ERROR:
      return {
        isAuthenticated: false,
        errorMessage: "You have an error please correct that!",
      };

    default:
      return state;
  }
};

export default loginReducer;
