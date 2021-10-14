import loginReducer from "./loginReducer";
import { combineReducers } from "redux";
import registerReducer from "./regsiterReducer";
import uploadReducer from "./uploadReducer";
const allReducers = combineReducers({
  isAuth: loginReducer,
  isUpl: uploadReducer,
  isReg: registerReducer,
});

export default allReducers;
