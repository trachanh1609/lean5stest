import {ADD_RESPONSE, CLEAR_RESPONSES} from "../constants/action-types";

const responseReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_RESPONSE:
            return [...state, action.payload];
        case CLEAR_RESPONSES:
            return state = [];
        default:
            return state;
    }
};

export default responseReducer;