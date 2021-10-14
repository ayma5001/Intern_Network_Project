import { REGISTER, REGISTER_ERROR } from "../Actions/types";
const DEFAULT_STATE = {
  isRegistred: false,
  errorMessage: "",
};
const registerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case REGISTER:
      return { isRegistred: true };
    case REGISTER_ERROR:
      return {
        isRegistred: false,
        errorMessage: "User not registred, Please verify !",
      };
    default:
      return state;
  }
};

export default registerReducer;
