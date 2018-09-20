import {UPDATE_CORPORATION} from "../constants/action-types";
var initialState = {
    id:"",
    name:""
};

const selCorReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CORPORATION:
            return action.payload;
        default:
            return state;
    }
};

export default selCorReducer;