import {combineReducers} from "redux";
import test from "./testReducer";
import bg from "./backgroundInformationReducer";

export default combineReducers({
    test,
    bg
});