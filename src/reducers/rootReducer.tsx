import {combineReducers} from "redux";
import test from "./testReducer";
import bg from "./backgroundInformationReducer";
import creationSettings from "./CreationSettingsReducer";

export default combineReducers({
    test,
    bg,
    creationSettings
});