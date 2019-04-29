import {combineReducers} from "redux";
import test from "./testReducer";
import bg from "./backgroundInformationReducer";
import creationSettings from "./CreationSettingsReducer";
import ui from "./UiReducer";
import levels from "./LevelsReducer";
import statistics from "./StatisticsReducer";

export default combineReducers({
    test,
    bg,
    creationSettings,
    ui,
    levels,
    statistics
});