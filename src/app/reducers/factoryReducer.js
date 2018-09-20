import {ADD_FACTORY, CLEAR_FACTORIES} from "../constants/action-types";

const factoryReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_FACTORY:
            return [...state, action.payload];
        case CLEAR_FACTORIES:
            return state = [];
        default:
            return state;
    }
};

export default factoryReducer;