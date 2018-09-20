import {UPDATE_FACTORY} from "../constants/action-types";

var initialState = {
    id:"",
    name:""
};

const selFacReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_FACTORY:
            return action.payload;
        default:
            return state;
    }
};

export default selFacReducer;