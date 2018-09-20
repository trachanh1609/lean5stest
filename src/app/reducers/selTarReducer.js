import {UPDATE_TARGET} from "../constants/action-types";
var initialState = {
    id:"",name:""
};
const selTarReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_TARGET:
            return action.payload;
        default:
            return state;
    }
};

export default selTarReducer;