import {ADD_TARGET, CLEAR_TARGETS} from "../constants/action-types";

const targetReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_TARGET:
            return [...state, action.payload];
        case CLEAR_TARGETS:
            return state = [];
        default:
            return state;
    }
};

export default targetReducer;