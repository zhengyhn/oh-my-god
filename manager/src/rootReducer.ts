import { combineReducers } from "redux";
import reply from "./reply/reducer";
import article from "./article/reducer/";

const rootReducer = combineReducers({
  reply,
  article
});

export default rootReducer;
