import {ADD_CORPORATION, CLEAR_CORPORATIONS} from "../constants/action-types";

const corporationReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_CORPORATION:
            return [...state, action.payload];
        case CLEAR_CORPORATIONS:
            return state = [];
        default:
            return state;
    }
};

export default corporationReducer;