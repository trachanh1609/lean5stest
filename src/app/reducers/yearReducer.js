import {SET_YEAR} from "../constants/action-types";

const yearReducer = (state = [], action) => {
    switch(action.type) {
        case SET_YEAR:
            return state=action.payload;
        default:
            return state;
    }
};

export default yearReducer;