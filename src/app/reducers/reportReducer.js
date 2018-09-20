import {UPDATE_REPORT, CLEAR_REPORT} from "../constants/action-types";

const reportReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_REPORT:
            return state=action.payload;
        case CLEAR_REPORT:
            return state = [];
        default:
            return state;
    }
};

export default reportReducer;