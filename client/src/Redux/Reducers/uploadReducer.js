import { UPLOADS, UPLOADS_ERROR } from "../Actions/types";
const DEFAULT_STATE = {
  isUploaded: false,
  errorMessage: "",
};
const uploadReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPLOADS:
      return { isUploaded: true };
    case UPLOADS_ERROR:
      return {
        isUploaded: false,
        errorMessage: "Data not uploaded, Please verify the problem !",
      };
    default:
      return state;
  }
};

export default uploadReducer;