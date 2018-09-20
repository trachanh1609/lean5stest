import {SET_CSV_ARRAY} from "../constants/action-types";

const csvReportReducer = (state = [], action) => {
    switch(action.type) {
        case SET_CSV_ARRAY:
            return action.payload;
        default:
            return state;
    }
};

export default csvReportReducer;