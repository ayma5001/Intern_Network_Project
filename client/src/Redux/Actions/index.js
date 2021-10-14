//import axios from "axios";
//import { AUTH_SIGN_IN, AUTH_ERROR } from "../Actions/types";

export const signIn = () => {
  return {
    type: "AUTH_SIGN_IN",
  };
};

export const authError = () => {
  return {
    type: "AUTH_ERROR",
  };
};

export const registerUser = () => {
  return {
    type: "REGISTER",
  };
};

export const uploadFiles = () => {
  return {
    type: "UPLOADS",
  };
};
// export const signIn = (username, password) => {
//   return async (dispatch) => {
//     try {
//       await axios.post("http://localhost:3001/user/login", {username, password});

//       dispatch({
//         type: AUTH_SIGN_IN,
//       });
//     } catch (err) {
//       dispatch({
//         type: AUTH_ERROR,
//         payload: "Email and password combination isn't valid",
//       });
//     }
//   };
// };
